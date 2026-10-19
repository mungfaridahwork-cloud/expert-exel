import { DailyQuestItem } from '../types';

export const DAILY_QUESTS: DailyQuestItem[] = [
  {
    id: 'dq-1',
    type: 'quiz',
    title: 'Misi 1: Tanda Mantra Ajaib Rumus Excel',
    difficulty: 'Mudah',
    xp: 25,
    prompt: 'Karakter apa yang wajib kamu ketik di awal sel sebelum Excel bersedia menghitung rumus secara otomatis?',
    options: [
      ': (Titik Dua)',
      '= (Sama Dengan)',
      '+ (Tanda Tambah)',
      '# (Tanda Tagar)'
    ],
    correctOptionIndex: 1,
    explanation: 'Benar sekali! Tanda sama dengan (=) adalah kunci pembuka yang memberitahu Excel: "Hai Excel, jangan anggap kotak ini teks biasa, tapi hitunglah rumusnya!"',
    commonTrap: 'Jika kamu lupa tanda sama dengan dan hanya mengetik "50+50", Excel hanya akan menganggapnya tulisan teks biasa dan tidak menghitung angka 100.',
    similarPromptId: 'dq-1-alt'
  },
  {
    id: 'dq-1-alt',
    type: 'quiz',
    title: 'Misi 1 (Variasi): Tanda Rentang Kotak',
    difficulty: 'Mudah',
    xp: 25,
    prompt: 'Jika kamu ingin menjumlahkan kotak dari A1 sampai dengan A10, simbol pemisah apa yang digunakan?',
    options: [
      '- (Tanda Minus)',
      ': (Titik Dua)',
      ', (Tanda Koma)',
      '/ (Garis Miring)'
    ],
    correctOptionIndex: 1,
    explanation: 'Tepat! Simbol titik dua (:) dalam Excel dibaca "sampai dengan", misalnya A1:A10 artinya seluruh sel dari A1 hingga A10.',
    commonTrap: 'Tanda koma (,) hanya memilih dua sel terpisah (A1 dan A10 saja), bukan seluruh kotak di antaranya.',
    similarPromptId: 'dq-1'
  },
  {
    id: 'dq-2',
    type: 'formula_drill',
    title: 'Misi 2: Kasir Warung Kopi',
    difficulty: 'Sedang',
    xp: 40,
    prompt: 'Di sel C2, hitung total harga pesanan dengan mengalikan sel A2 (Jumlah Cup) dengan B2 (Harga per Cup).',
    questionContext: 'Toko Kopi Senja menjual 3 cup Kopi Susu seharga Rp 18.000 per cup.',
    targetCell: 'C2',
    targetFormula: '=A2*B2',
    expectedValue: 54000,
    initialSheetData: {
      A1: 'Jumlah Cup', B1: 'Harga Satuan', C1: 'Total Bayar',
      A2: '3', B2: '18000', C2: ''
    },
    explanation: 'Keren! Rumus =A2*B2 mengalikan 3 dengan 18000 menghasilkan Rp 54.000.',
    commonTrap: 'Hindari mengetik angka manual =3*18000 (hardcode). Jika jumlah cup di sel A2 diganti, total bayar tidak akan otomatis berubah!',
    similarPromptId: 'dq-2-alt'
  },
  {
    id: 'dq-2-alt',
    type: 'formula_drill',
    title: 'Misi 2 (Variasi): Hitung Rata-rata Nilai',
    difficulty: 'Sedang',
    xp: 40,
    prompt: 'Di sel B5, hitung rata-rata nilai ketiga mata pelajaran (B2 sampai B4) dengan fungsi =AVERAGE(B2:B4).',
    questionContext: 'Nilai Matematika (80), Bahasa (90), IPA (70).',
    targetCell: 'B5',
    targetFormula: '=AVERAGE(B2:B4)',
    expectedValue: 80,
    initialSheetData: {
      A1: 'Mata Pelajaran', B1: 'Nilai',
      A2: 'Matematika', B2: '80',
      A3: 'Bahasa Indonesia', B3: '90',
      A4: 'IPA', B4: '70',
      A5: 'Rata-rata', B5: ''
    },
    explanation: 'Hebat! (80 + 90 + 70) / 3 = 80. AVERAGE menghitung rerata secara instan.',
    commonTrap: 'Jangan gunakan SUM jika ingin mencari nilai rata-rata, karena SUM hanya menjumlahkan totalnya.',
    similarPromptId: 'dq-2'
  },
  {
    id: 'dq-3',
    type: 'quiz',
    title: 'Misi 3: Satpam Logika IF',
    difficulty: 'Sedang',
    xp: 35,
    prompt: 'Apa hasil dari rumus ini jika sel A1 berisi angka 80?\n=IF(A1>=75, "LULUS", "REMIDI")',
    options: [
      'LULUS',
      'REMIDI',
      '#VALUE!',
      '80'
    ],
    correctOptionIndex: 0,
    explanation: 'Tepat! Karena 80 lebih besar atau sama dengan 75 (Kondisi BENAR), maka Excel langsung memilih pilihan pertama yaitu "LULUS".',
    commonTrap: 'Jika nilai di A1 adalah 74, barulah hasilnya menjadi "REMIDI".',
    similarPromptId: 'dq-3-alt'
  },
  {
    id: 'dq-3-alt',
    type: 'quiz',
    title: 'Misi 3 (Variasi): Operator Pembanding Tidak Sama Dengan',
    difficulty: 'Sedang',
    xp: 35,
    prompt: 'Dalam Excel, simbol mana yang melambangkan kondisi "Tidak Sama Dengan"?',
    options: [
      '!=',
      '<>',
      '/=',
      '~='
    ],
    correctOptionIndex: 1,
    explanation: 'Mantap! Di Excel standar, "Tidak Sama Dengan" ditulis dengan kurung sudut saling berhadapan: <> (contoh A1<>0).',
    commonTrap: 'Simbol != berasal dari bahasa pemrograman umum, tetapi Excel tradisional menggunakan <>.',
    similarPromptId: 'dq-3'
  },
  {
    id: 'dq-4',
    type: 'formula_drill',
    title: 'Misi 4: Detektif SUMIF Khusus Cabang',
    difficulty: 'Tantangan',
    xp: 50,
    prompt: 'Di sel D2, jumlahkan total penjualan khusus cabang "Surabaya" dari tabel A2:B5 menggunakan: =SUMIF(A2:A5, "Surabaya", B2:B5)',
    questionContext: 'Terdapat transaksi dari cabang Surabaya dan Malang.',
    targetCell: 'D2',
    targetFormula: '=SUMIF(A2:A5, "Surabaya", B2:B5)',
    expectedValue: 45000000,
    initialSheetData: {
      A1: 'Cabang', B1: 'Omset', C1: '', D1: 'Total Surabaya',
      A2: 'Surabaya', B2: '20000000', C2: '', D2: '',
      A3: 'Malang', B3: '15000000', C3: '', D3: '',
      A4: 'Surabaya', B4: '25000000', C4: '', D4: '',
      A5: 'Malang', B5: '12000000', C5: '', D5: ''
    },
    explanation: 'Sempurna! SUMIF menyaring baris Surabaya (20jt + 25jt) dan menghasilkan total 45.000.000.',
    commonTrap: 'Pastikan penulisan kata "Surabaya" di dalam rumus persis sama dengan isi kolom cabang.',
    similarPromptId: 'dq-4-alt'
  },
  {
    id: 'dq-4-alt',
    type: 'quiz',
    title: 'Misi 4 (Variasi): Mengunci Sel Pakai Dolar',
    difficulty: 'Tantangan',
    xp: 45,
    prompt: 'Apa fungsi dari tanda dollar ($) pada rumus seperti =$A$1*B2?',
    options: [
      'Mengubah angka menjadi mata uang Dollar Amerika (USD)',
      'Mengunci alamat sel A1 agar posisinya tidak bergeser saat rumus disalin (autofill)',
      'Membuat rumus dihitung lebih cepat',
      'Memberi tahu Excel bahwa sel tersebut berisi transaksi uang'
    ],
    correctOptionIndex: 1,
    explanation: 'Tepat sekali! Tanda $ adalah "paku absolut". $A$1 mengunci kolom A dan baris 1 sehingga tidak meleset saat rumus di-drag ke bawah.',
    commonTrap: 'Banyak pemula mengira tanda $ berhubungan dengan mata uang, padahal itu adalah Absolute Cell Reference.',
    similarPromptId: 'dq-4'
  }
];
