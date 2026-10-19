import { GridData, CellData } from '../types';

// Convert column letter(s) to 0-based index: 'A' -> 0, 'B' -> 1, 'AA' -> 26
export function colNameToIndex(col: string): number {
  let index = 0;
  const upper = col.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    index = index * 26 + (upper.charCodeAt(i) - 64);
  }
  return index - 1;
}

// Convert 0-based index to column letter: 0 -> 'A', 25 -> 'Z', 26 -> 'AA'
export function indexToColName(index: number): string {
  let col = '';
  let temp = index + 1;
  while (temp > 0) {
    const rem = (temp - 1) % 26;
    col = String.fromCharCode(65 + rem) + col;
    temp = Math.floor((temp - 1) / 26);
  }
  return col;
}

// Parse cell coordinate like 'A1' or '$B$4' into { col: 'A', row: 1 }
export function parseCellCoord(coord: string): { col: string; row: number; colIndex: number } | null {
  const match = coord.trim().replace(/\$/g, '').toUpperCase().match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  const col = match[1];
  const row = parseInt(match[2], 10);
  if (isNaN(row) || row <= 0) return null;
  return { col, row, colIndex: colNameToIndex(col) };
}

// Parse range like 'A1:C3' into array of cell keys: ['A1', 'B1', 'C1', 'A2', ...]
export function parseRange(rangeStr: string): string[] {
  const parts = rangeStr.split(':');
  if (parts.length === 1) {
    const single = parseCellCoord(parts[0]);
    return single ? [`${single.col}${single.row}`] : [];
  }
  if (parts.length !== 2) return [];

  const start = parseCellCoord(parts[0]);
  const end = parseCellCoord(parts[1]);
  if (!start || !end) return [];

  const minCol = Math.min(start.colIndex, end.colIndex);
  const maxCol = Math.max(start.colIndex, end.colIndex);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  const result: string[] = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      result.push(`${indexToColName(c)}${r}`);
    }
  }
  return result;
}

// Evaluation Engine
export class FormulaEngine {
  private grid: GridData = {};
  private visiting: Set<string> = new Set();
  private cache: Map<string, string | number | null> = new Map();

  constructor(grid: GridData) {
    this.grid = grid;
  }

  public evaluateAll(): GridData {
    this.cache.clear();
    const evaluatedGrid: GridData = {};

    for (const [cellKey, cell] of Object.entries(this.grid)) {
      this.visiting.clear();
      const raw = cell.raw || '';
      if (!raw.startsWith('=')) {
        // Normal text or number
        const computed = this.parseLiteral(raw);
        evaluatedGrid[cellKey] = {
          ...cell,
          computed,
          error: null,
        };
      } else {
        try {
          const computed = this.evaluateCell(cellKey);
          const isErrorStr = typeof computed === 'string' && computed.startsWith('#');
          evaluatedGrid[cellKey] = {
            ...cell,
            computed,
            error: isErrorStr ? computed : null,
          };
        } catch (err: any) {
          evaluatedGrid[cellKey] = {
            ...cell,
            computed: '#ERROR!',
            error: err?.message || '#ERROR!',
          };
        }
      }
    }

    return evaluatedGrid;
  }

  public evaluateSingleCell(cellKey: string): string | number | null {
    this.visiting.clear();
    this.cache.clear();
    return this.evaluateCell(cellKey);
  }

  private parseLiteral(val: string): string | number | null {
    if (val === '') return null;
    const num = Number(val);
    if (!isNaN(num) && val.trim() !== '') return num;
    return val;
  }

  private getCellValue(cellKey: string): string | number | null {
    const normalizedKey = cellKey.toUpperCase().replace(/\$/g, '');
    if (this.cache.has(normalizedKey)) {
      return this.cache.get(normalizedKey)!;
    }

    const cell = this.grid[normalizedKey];
    if (!cell || cell.raw === undefined || cell.raw === '') {
      return null;
    }

    if (!cell.raw.startsWith('=')) {
      const val = this.parseLiteral(cell.raw);
      this.cache.set(normalizedKey, val);
      return val;
    }

    // Evaluate dependent formula
    return this.evaluateCell(normalizedKey);
  }

  private evaluateCell(cellKey: string): string | number | null {
    const normalizedKey = cellKey.toUpperCase().replace(/\$/g, '');
    if (this.cache.has(normalizedKey)) {
      return this.cache.get(normalizedKey)!;
    }

    if (this.visiting.has(normalizedKey)) {
      return '#CIRCULAR!';
    }

    const cell = this.grid[normalizedKey];
    if (!cell || !cell.raw) return null;

    if (!cell.raw.startsWith('=')) {
      return this.parseLiteral(cell.raw);
    }

    this.visiting.add(normalizedKey);
    const formula = cell.raw.substring(1).trim();
    const result = this.evaluateExpression(formula);
    this.visiting.delete(normalizedKey);
    this.cache.set(normalizedKey, result);
    return result;
  }

  public evaluateExpression(expr: string): string | number | null {
    const trimmed = expr.trim();
    if (!trimmed) return null;

    // Handle IFERROR explicitly at outer level
    const iferrorMatch = trimmed.match(/^IFERROR\((.*)\)$/i);
    if (iferrorMatch) {
      const args = this.splitTopLevelArgs(iferrorMatch[1]);
      if (args.length >= 2) {
        const val = this.evaluateExpression(args[0]);
        if (typeof val === 'string' && val.startsWith('#')) {
          return this.evaluateExpression(args[1]);
        }
        return val;
      }
    }

    // Check for string concatenation (&)
    const concatParts = this.splitByOperator(trimmed, '&');
    if (concatParts.length > 1) {
      return concatParts.map((p) => {
        const val = this.evaluateExpression(p);
        return val === null ? '' : String(val);
      }).join('');
    }

    // Check for comparisons (>, <, >=, <=, =, <>)
    const compMatch = this.findTopLevelComparison(trimmed);
    if (compMatch) {
      const left = this.evaluateExpression(compMatch.left);
      const right = this.evaluateExpression(compMatch.right);
      return this.applyComparison(compMatch.op, left, right) ? 1 : 0;
    }

    // Check for addition and subtraction (+, -)
    const addSub = this.splitAddSub(trimmed);
    if (addSub) {
      const leftVal = this.evaluateExpression(addSub.left);
      const rightVal = this.evaluateExpression(addSub.right);
      if (typeof leftVal === 'string' && leftVal.startsWith('#')) return leftVal;
      if (typeof rightVal === 'string' && rightVal.startsWith('#')) return rightVal;
      const l = Number(leftVal) || 0;
      const r = Number(rightVal) || 0;
      return addSub.op === '+' ? l + r : l - r;
    }

    // Check for multiplication and division (*, /)
    const mulDiv = this.splitMulDiv(trimmed);
    if (mulDiv) {
      const leftVal = this.evaluateExpression(mulDiv.left);
      const rightVal = this.evaluateExpression(mulDiv.right);
      if (typeof leftVal === 'string' && leftVal.startsWith('#')) return leftVal;
      if (typeof rightVal === 'string' && rightVal.startsWith('#')) return rightVal;
      const l = Number(leftVal);
      const r = Number(rightVal);
      if (isNaN(l) || isNaN(r)) return '#VALUE!';
      if (mulDiv.op === '/') {
        if (r === 0) return '#DIV/0!';
        return l / r;
      }
      return l * r;
    }

    // Check for exponent (^)
    const expParts = this.splitByOperator(trimmed, '^');
    if (expParts.length > 1) {
      let res = Number(this.evaluateExpression(expParts[0]));
      for (let i = 1; i < expParts.length; i++) {
        const next = Number(this.evaluateExpression(expParts[i]));
        res = Math.pow(res, next);
      }
      return isNaN(res) ? '#VALUE!' : res;
    }

    // Parentheses wrapping: (expression)
    if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
      // Check if parentheses are matching
      if (this.isEnclosingParens(trimmed)) {
        return this.evaluateExpression(trimmed.slice(1, -1));
      }
    }

    // String literals: "Hello"
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return trimmed.slice(1, -1);
    }

    // Number literals
    if (!isNaN(Number(trimmed)) && trimmed !== '') {
      return Number(trimmed);
    }

    // Boolean literals
    if (trimmed.toUpperCase() === 'TRUE') return 1;
    if (trimmed.toUpperCase() === 'FALSE') return 0;

    // Single Cell reference: A1, B4, $C$10
    if (/^\$?[A-Za-z]+\$?[0-9]+$/.test(trimmed)) {
      return this.getCellValue(trimmed);
    }

    // Function calls: SUM(A1:A5), IF(...), etc.
    const funcMatch = trimmed.match(/^([A-Za-z0-9_]+)\((.*)\)$/s);
    if (funcMatch) {
      const funcName = funcMatch[1].toUpperCase();
      const rawArgs = funcMatch[2];
      return this.executeFunction(funcName, rawArgs);
    }

    return '#NAME?';
  }

  private executeFunction(name: string, rawArgs: string): string | number | null {
    const args = this.splitTopLevelArgs(rawArgs);

    switch (name) {
      case 'SUM': {
        const values = this.expandValues(args);
        let sum = 0;
        for (const v of values) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          const n = Number(v);
          if (!isNaN(n)) sum += n;
        }
        return sum;
      }

      case 'AVERAGE': {
        const values = this.expandValues(args);
        let sum = 0;
        let count = 0;
        for (const v of values) {
          if (typeof v === 'string' && v.startsWith('#')) return v;
          const n = Number(v);
          if (!isNaN(n) && v !== null && v !== '') {
            sum += n;
            count++;
          }
        }
        return count === 0 ? '#DIV/0!' : sum / count;
      }

      case 'MIN': {
        const values = this.expandValues(args);
        const nums = values.map(Number).filter((n) => !isNaN(n) && n !== null);
        return nums.length === 0 ? 0 : Math.min(...nums);
      }

      case 'MAX': {
        const values = this.expandValues(args);
        const nums = values.map(Number).filter((n) => !isNaN(n) && n !== null);
        return nums.length === 0 ? 0 : Math.max(...nums);
      }

      case 'COUNT': {
        const values = this.expandValues(args);
        let count = 0;
        for (const v of values) {
          if (v !== null && v !== '' && !isNaN(Number(v))) count++;
        }
        return count;
      }

      case 'COUNTA': {
        const values = this.expandValues(args);
        let count = 0;
        for (const v of values) {
          if (v !== null && String(v).trim() !== '') count++;
        }
        return count;
      }

      case 'IF': {
        if (args.length < 2) return '#VALUE!';
        const condition = this.evaluateExpression(args[0]);
        const truthy = Boolean(condition && condition !== 0 && condition !== 'FALSE' && condition !== 'false');
        if (truthy) {
          return this.evaluateExpression(args[1]);
        } else {
          return args.length >= 3 ? this.evaluateExpression(args[2]) : 0;
        }
      }

      case 'SUMIF': {
        if (args.length < 2) return '#VALUE!';
        const rangeCells = parseRange(args[0]);
        const criteria = this.evaluateExpression(args[1]);
        const sumRangeCells = args.length >= 3 ? parseRange(args[2]) : rangeCells;

        let total = 0;
        for (let i = 0; i < rangeCells.length; i++) {
          const cellVal = this.getCellValue(rangeCells[i]);
          if (this.matchesCriteria(cellVal, criteria)) {
            const sumCell = sumRangeCells[i] || rangeCells[i];
            const sumVal = Number(this.getCellValue(sumCell));
            if (!isNaN(sumVal)) total += sumVal;
          }
        }
        return total;
      }

      case 'COUNTIF': {
        if (args.length < 2) return '#VALUE!';
        const rangeCells = parseRange(args[0]);
        const criteria = this.evaluateExpression(args[1]);

        let matches = 0;
        for (const c of rangeCells) {
          const val = this.getCellValue(c);
          if (this.matchesCriteria(val, criteria)) {
            matches++;
          }
        }
        return matches;
      }

      case 'CONCAT':
      case 'CONCATENATE': {
        const values = this.expandValues(args);
        return values.map((v) => (v === null ? '' : String(v))).join('');
      }

      case 'UPPER': {
        if (!args[0]) return '';
        const val = this.evaluateExpression(args[0]);
        return String(val ?? '').toUpperCase();
      }

      case 'LOWER': {
        if (!args[0]) return '';
        const val = this.evaluateExpression(args[0]);
        return String(val ?? '').toLowerCase();
      }

      case 'PROPER': {
        if (!args[0]) return '';
        const val = String(this.evaluateExpression(args[0]) ?? '');
        return val.replace(/\b\w/g, (c) => c.toUpperCase());
      }

      case 'LEN': {
        if (!args[0]) return 0;
        const val = this.evaluateExpression(args[0]);
        return String(val ?? '').length;
      }

      case 'LEFT': {
        if (!args[0]) return '';
        const str = String(this.evaluateExpression(args[0]) ?? '');
        const count = args[1] ? Number(this.evaluateExpression(args[1])) : 1;
        return str.substring(0, isNaN(count) ? 1 : count);
      }

      case 'RIGHT': {
        if (!args[0]) return '';
        const str = String(this.evaluateExpression(args[0]) ?? '');
        const count = args[1] ? Number(this.evaluateExpression(args[1])) : 1;
        const len = isNaN(count) ? 1 : count;
        return str.substring(Math.max(0, str.length - len));
      }

      case 'MID': {
        if (args.length < 3) return '#VALUE!';
        const str = String(this.evaluateExpression(args[0]) ?? '');
        const start = Number(this.evaluateExpression(args[1])); // 1-based index in Excel
        const len = Number(this.evaluateExpression(args[2]));
        if (isNaN(start) || isNaN(len) || start <= 0) return '#VALUE!';
        return str.substring(start - 1, start - 1 + len);
      }

      case 'ROUND': {
        if (args.length < 2) return '#VALUE!';
        const num = Number(this.evaluateExpression(args[0]));
        const decimals = Number(this.evaluateExpression(args[1])) || 0;
        if (isNaN(num)) return '#VALUE!';
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
      }

      case 'ROUNDUP': {
        if (args.length < 2) return '#VALUE!';
        const num = Number(this.evaluateExpression(args[0]));
        const decimals = Number(this.evaluateExpression(args[1])) || 0;
        if (isNaN(num)) return '#VALUE!';
        const factor = Math.pow(10, decimals);
        return Math.ceil(num * factor) / factor;
      }

      case 'ROUNDDOWN': {
        if (args.length < 2) return '#VALUE!';
        const num = Number(this.evaluateExpression(args[0]));
        const decimals = Number(this.evaluateExpression(args[1])) || 0;
        if (isNaN(num)) return '#VALUE!';
        const factor = Math.pow(10, decimals);
        return Math.floor(num * factor) / factor;
      }

      case 'VLOOKUP': {
        if (args.length < 3) return '#VALUE!';
        const lookupVal = this.evaluateExpression(args[0]);
        const rangeCells = parseRange(args[1]);
        const colIdx = Number(this.evaluateExpression(args[2])); // 1-based
        if (isNaN(colIdx) || colIdx < 1 || rangeCells.length === 0) return '#VALUE!';

        // Group range cells by rows
        const rowMap: Record<number, string[]> = {};
        for (const cellKey of rangeCells) {
          const coord = parseCellCoord(cellKey);
          if (coord) {
            if (!rowMap[coord.row]) rowMap[coord.row] = [];
            rowMap[coord.row].push(cellKey);
          }
        }

        const sortedRows = Object.keys(rowMap).map(Number).sort((a, b) => a - b);
        for (const rowNum of sortedRows) {
          const cellsInRow = rowMap[rowNum];
          const firstCellVal = this.getCellValue(cellsInRow[0]);
          if (this.fuzzyOrExactEqual(firstCellVal, lookupVal)) {
            const targetCell = cellsInRow[colIdx - 1];
            if (!targetCell) return '#REF!';
            return this.getCellValue(targetCell);
          }
        }
        return '#N/A';
      }

      case 'XLOOKUP': {
        if (args.length < 3) return '#VALUE!';
        const lookupVal = this.evaluateExpression(args[0]);
        const lookupArray = parseRange(args[1]);
        const returnArray = parseRange(args[2]);
        const notFoundVal = args.length >= 4 ? this.evaluateExpression(args[3]) : '#N/A';

        for (let i = 0; i < lookupArray.length; i++) {
          const current = this.getCellValue(lookupArray[i]);
          if (this.fuzzyOrExactEqual(current, lookupVal)) {
            const returnCell = returnArray[i];
            return returnCell ? this.getCellValue(returnCell) : 0;
          }
        }
        return notFoundVal;
      }

      case 'TODAY': {
        const now = new Date();
        return now.toISOString().split('T')[0];
      }

      case 'NOW': {
        const now = new Date();
        return `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString()}`;
      }

      default:
        return '#NAME?';
    }
  }

  // Helpers
  private fuzzyOrExactEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a === null || b === null || a === undefined || b === undefined) return false;
    const strA = String(a).trim().toLowerCase();
    const strB = String(b).trim().toLowerCase();
    if (strA === strB) return true;
    const numA = Number(a);
    const numB = Number(b);
    return !isNaN(numA) && !isNaN(numB) && numA === numB;
  }

  private matchesCriteria(val: any, criteria: any): boolean {
    if (criteria === null || criteria === undefined) return val === criteria;
    const critStr = String(criteria).trim();

    // Check operator in criteria string like ">100", "<=50", "<>0", "=Apel"
    const opMatch = critStr.match(/^([><=!]+)(.*)$/);
    if (opMatch) {
      const op = opMatch[1];
      const targetStr = opMatch[2].trim();
      const numVal = Number(val);
      const numTarget = Number(targetStr);

      if (!isNaN(numVal) && !isNaN(numTarget)) {
        if (op === '>') return numVal > numTarget;
        if (op === '>=') return numVal >= numTarget;
        if (op === '<') return numVal < numTarget;
        if (op === '<=') return numVal <= numTarget;
        if (op === '=' || op === '==') return numVal === numTarget;
        if (op === '<>' || op === '!=') return numVal !== numTarget;
      }

      // String comparison
      const strVal = String(val ?? '').toLowerCase();
      const lowTarget = targetStr.toLowerCase();
      if (op === '=') return strVal === lowTarget;
      if (op === '<>' || op === '!=') return strVal !== lowTarget;
    }

    // Default exact or wildcard match
    return this.fuzzyOrExactEqual(val, criteria);
  }

  private expandValues(args: string[]): (string | number | null)[] {
    const list: (string | number | null)[] = [];
    for (const arg of args) {
      const trimmed = arg.trim();
      if (trimmed.includes(':')) {
        const cellKeys = parseRange(trimmed);
        for (const k of cellKeys) {
          list.push(this.getCellValue(k));
        }
      } else {
        list.push(this.evaluateExpression(trimmed));
      }
    }
    return list;
  }

  private splitTopLevelArgs(str: string): string[] {
    const args: string[] = [];
    let current = '';
    let parenDepth = 0;
    let inQuotes = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '"') {
        inQuotes = !inQuotes;
        current += char;
      } else if (!inQuotes && char === '(') {
        parenDepth++;
        current += char;
      } else if (!inQuotes && char === ')') {
        parenDepth--;
        current += char;
      } else if (!inQuotes && parenDepth === 0 && (char === ',' || char === ';')) {
        args.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) {
      args.push(current.trim());
    }
    return args;
  }

  private splitByOperator(str: string, op: string): string[] {
    const parts: string[] = [];
    let current = '';
    let parenDepth = 0;
    let inQuotes = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '"') {
        inQuotes = !inQuotes;
        current += char;
      } else if (!inQuotes && char === '(') {
        parenDepth++;
        current += char;
      } else if (!inQuotes && char === ')') {
        parenDepth--;
        current += char;
      } else if (!inQuotes && parenDepth === 0 && char === op) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) {
      parts.push(current.trim());
    }
    return parts;
  }

  private splitAddSub(str: string): { left: string; op: '+' | '-'; right: string } | null {
    let parenDepth = 0;
    let inQuotes = false;

    // Search from right to left for left-associativity
    for (let i = str.length - 1; i >= 0; i--) {
      const char = str[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (!inQuotes && char === ')') {
        parenDepth++;
      } else if (!inQuotes && char === '(') {
        parenDepth--;
      } else if (!inQuotes && parenDepth === 0 && (char === '+' || char === '-')) {
        // Ensure it's not a leading negative or inside an exponential number like 1e-5
        if (i > 0) {
          const prev = str[i - 1];
          if (!['+', '-', '*', '/', '^', '(', ','].includes(prev)) {
            return {
              left: str.substring(0, i),
              op: char as '+' | '-',
              right: str.substring(i + 1),
            };
          }
        }
      }
    }
    return null;
  }

  private splitMulDiv(str: string): { left: string; op: '*' | '/'; right: string } | null {
    let parenDepth = 0;
    let inQuotes = false;

    for (let i = str.length - 1; i >= 0; i--) {
      const char = str[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (!inQuotes && char === ')') {
        parenDepth++;
      } else if (!inQuotes && char === '(') {
        parenDepth--;
      } else if (!inQuotes && parenDepth === 0 && (char === '*' || char === '/')) {
        return {
          left: str.substring(0, i),
          op: char as '*' | '/',
          right: str.substring(i + 1),
        };
      }
    }
    return null;
  }

  private findTopLevelComparison(str: string): { left: string; op: string; right: string } | null {
    const ops = ['>=', '<=', '<>', '!=', '==', '>', '<', '='];
    let parenDepth = 0;
    let inQuotes = false;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char === '"') inQuotes = !inQuotes;
      else if (!inQuotes && char === '(') parenDepth++;
      else if (!inQuotes && char === ')') parenDepth--;
      else if (!inQuotes && parenDepth === 0) {
        for (const op of ops) {
          if (str.substring(i, i + op.length) === op) {
            return {
              left: str.substring(0, i),
              op,
              right: str.substring(i + op.length),
            };
          }
        }
      }
    }
    return null;
  }

  private applyComparison(op: string, left: any, right: any): boolean {
    const numL = Number(left);
    const numR = Number(right);
    const areNumbers = !isNaN(numL) && !isNaN(numR) && left !== null && right !== null && left !== '' && right !== '';

    if (areNumbers) {
      if (op === '>') return numL > numR;
      if (op === '>=') return numL >= numR;
      if (op === '<') return numL < numR;
      if (op === '<=') return numL <= numR;
      if (op === '=' || op === '==') return numL === numR;
      if (op === '<>' || op === '!=') return numL !== numR;
    }

    const strL = String(left ?? '').toLowerCase();
    const strR = String(right ?? '').toLowerCase();
    if (op === '=' || op === '==') return strL === strR;
    if (op === '<>' || op === '!=') return strL !== strR;
    if (op === '>') return strL > strR;
    if (op === '<') return strL < strR;
    return false;
  }

  private isEnclosingParens(str: string): boolean {
    if (!str.startsWith('(') || !str.endsWith(')')) return false;
    let depth = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') depth++;
      else if (str[i] === ')') depth--;
      if (depth === 0 && i < str.length - 1) return false;
    }
    return depth === 0;
  }
}
