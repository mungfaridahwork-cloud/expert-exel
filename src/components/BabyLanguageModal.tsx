import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  X,
  RefreshCw,
  Play
} from 'lucide-react';
import mascotImg from '../assets/images/mascot_baby_analyst_1792382946381.jpg';

interface BabyLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  onNavigateToWorksheet?: (presetData?: Record<string, string>, targetCell?: string) => void;
}

const POPULAR_CONCEPTS = [
  { key: 'cell', label: 'Cell (Sel)', icon: '🍱' },
  { key: 'range', label: 'Range (Rentang)', icon: '📦' },
  { key: 'sum', label: 'SUM (Jumlah)', icon: '➕' },
  { key: 'average', label: 'AVERAGE (Rata-rata)', icon: '⚖️' },
  { key: 'if', label: 'IF (Logika Jika-Maka)', icon: '👮‍♂️' },
  { key: 'sumif', label: 'SUMIF (Jumlah Bersyarat)', icon: '🎯' },
  { key: 'countif', label: 'COUNTIF (Hitung Syarat)', icon: '🔍' },
  { key: 'vlookup', label: 'VLOOKUP', icon: '📋' },
  { key: 'xlookup', label: 'XLOOKUP (Modern)', icon: '🚀' },
  { key: 'filter', label: 'Filter & Sort', icon: '🫗' },
  { key: 'pivottable', label: 'PivotTable', icon: '🪄' },
  { key: 'error', label: 'Error Decoder (#DIV/0!, #N/A)', icon: '🚨' }
];

export const BabyLanguageModal: React.FC<BabyLanguageModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'cell',
  onNavigateToWorksheet
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [activeMode, setActiveMode] = useState<'baby' | 'example' | 'more_example' | 'detail' | 'practice'>('baby');
  const [responseHtml, setResponseHtml] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceType, setSourceType] = useState<'ai' | 'dictionary'>('dictionary');
  const [dictionaryData, setDictionaryData] = useState<any>(null);

  const CLIENT_DICTIONARY: Record<string, { term: string; baby: string; example: string; more: string; detail: string; practice: string }> = {
    cell: {
      term: 'Cell (Sel)',
      baby: '🧸 **Bahasa Bayi: Cell (Sel)**\n\n💡 *Analogi sederhana:* Satu kotak bento kecil tempat menyimpan satu sendok lauk.\n\n📖 *Penjelasan:* Cell adalah satu kotak tunggal pertemuan antara Kolom (huruf) dan Baris (angka). Contoh: A1 adalah kotak di kolom A baris 1.\n\n⌨️ *Contoh:* Ketik angka 50 di kotak A1.',
      example: '✨ **Contoh Nyata Cell**\n\nSel A1 = 100\nSel B1 = 200\nDi sel C1 ketik: `=A1+B1`\nHasilnya langsung 300!',
      more: '🎯 **Contoh Lain:**\n\nCell bisa menampung 3 hal: Teks ("Budi"), Angka murni (50000), atau Formula (`=A1*2`).',
      detail: '🔍 **Detail Teknis:**\n\nSetiap lembar Excel memiliki 1.048.576 baris dan 16.384 kolom (hingga XFD). Sel aktif ditandai garis tepi hijau tebal dan koordinatnya tampil di kotak Nama (Name Box).',
      practice: '🏋️ **Latihan Kilat:**\n\nKlik kotak B2 di Worksheet Studio, lalu ketik namamu dan tekan Enter!'
    },
    range: {
      term: 'Range (Rentang)',
      baby: '🧸 **Bahasa Bayi: Range (Rentang)**\n\n💡 *Analogi sederhana:* Sekotak telur isi 6 yang kamu bawa sekaligus, bukan satu butir telur saja.\n\n📖 *Penjelasan:* Range adalah sekumpulan dua sel atau lebih. Ditulis dengan tanda titik dua (:). Misalnya A1:A5 artinya dari kotak A1 sampai A5.',
      example: '✨ **Contoh Nyata Range:**\n\n`=SUM(A1:A5)`\nMenjumlahkan semua angka di kotak A1, A2, A3, A4, dan A5 sekaligus.',
      more: '🎯 **Contoh Lain:**\n\n`B2:D10` adalah area kotak persegi panjang dari kolom B baris 2 sampai kolom D baris 10 (total 27 kotak).',
      detail: '🔍 **Detail Teknis:**\n\nTanda titik dua (:) adalah operator rentang. Tanda koma (,) adalah operator gabungan (union) misalnya A1,B5 hanya memilih 2 kotak tersebut.',
      practice: '🏋️ **Latihan Kilat:**\n\nSorot sel A1 sampai A4 dengan drag mouse di Worksheet Studio!'
    },
    sum: {
      term: 'SUM',
      baby: '🧸 **Bahasa Bayi: SUM**\n\n💡 *Analogi sederhana:* Asisten kasir mini yang bertugas menjumlahkan semua belanjaan tanpa pernah mengeluh capek.\n\n📖 *Penjelasan:* SUM menjumlahkan seluruh angka di dalam rentang kurung secara otomatis.',
      example: '✨ **Contoh Nyata SUM:**\n\n`=SUM(B2:B10)`\nMenjumlahkan seluruh omset penjualan dari baris 2 sampai 10.',
      more: '🎯 **Contoh Lain:**\n\n`=SUM(10, 20, 30)` langsung menghasilkan 60 tanpa perlu tanda tambah 10+20+30.',
      detail: '🔍 **Detail Teknis:**\n\nSintaks: `=SUM(number1, [number2], ...)`. Jika ada teks di dalam rentang yang dipilih, fungsi SUM akan otomatis mengabaikan teks tersebut tanpa error.',
      practice: '🏋️ **Latihan Kilat:**\n\nBuat daftar harga di A1:A3 lalu di A4 ketik `=SUM(A1:A3)`.'
    },
    average: {
      term: 'AVERAGE',
      baby: '🧸 **Bahasa Bayi: AVERAGE**\n\n💡 *Analogi sederhana:* Hakim adil yang membagi rata kue bolu ke seluruh anak agar tidak ada yang iri.\n\n📖 *Penjelasan:* AVERAGE menghitung nilai rata-rata dari kumpulan angka.',
      example: '✨ **Contoh Nyata AVERAGE:**\n\n`=AVERAGE(B2:B30)`\nMenghitung rata-rata nilai rapor siswa di kelas.',
      more: '🎯 **Contoh Lain:**\n\n`=AVERAGE(80, 90, 100)` menghasilkan 90.',
      detail: '🔍 **Detail Teknis:**\n\nAVERAGE menjumlahkan semua angka lalu membaginya dengan jumlah sel yang berisi angka. Sel kosong diabaikan, tetapi sel bernilai 0 tetap dihitung!',
      practice: '🏋️ **Latihan Kilat:**\n\nHitung rata-rata harga produk dengan `=AVERAGE(B2:B5)` di Worksheet Studio.'
    },
    if: {
      term: 'IF (Logika)',
      baby: '🧸 **Bahasa Bayi: IF**\n\n💡 *Analogi sederhana:* Satpam bioskop: "Kalau punya tiket boleh masuk studio, kalau tidak punya beli tiket dulu di loket".\n\n📖 *Penjelasan:* Aturan jika-maka. Jika kondisi BENAR lakukan A, jika SALAH lakukan B.',
      example: '✨ **Contoh Nyata IF:**\n\n`=IF(B2>=75, "LULUS", "REMIDIAL")`\nJika nilai di B2 minimal 75 hasilnya "LULUS", jika kurang hasilnya "REMIDIAL".',
      more: '🎯 **Contoh Lain:**\n\n`=IF(C2>100000, C2*0.1, 0)`\nMemberikan diskon 10% hanya jika belanja lebih dari 100 ribu.',
      detail: '🔍 **Detail Teknis:**\n\nSintaks: `=IF(logical_test, value_if_true, [value_if_false])`. Teks wajib diapit tanda petik dua ("). Bisa dibuat bertingkat (Nested IF).',
      practice: '🏋️ **Latihan Kilat:**\n\nKetik `=IF(A1>50, "Bagus", "Coba Lagi")` di sel B1.'
    },
    sumif: {
      term: 'SUMIF',
      baby: '🧸 **Bahasa Bayi: SUMIF**\n\n💡 *Analogi sederhana:* Kasir pintar yang hanya menjumlahkan barang yang warnanya pink di keranjang belanjaan.\n\n📖 *Penjelasan:* Menjumlahkan angka hanya jika baris tersebut cocok dengan 1 kriteria tertentu.',
      example: '✨ **Contoh Nyata SUMIF:**\n\n`=SUMIF(A2:A10, "Kopi", B2:B10)`\nMencari kata "Kopi" di kolom A, lalu menjumlahkan omset di kolom B.',
      more: '🎯 **Contoh Lain:**\n\n`=SUMIF(C2:C20, ">100000")`\nMenjumlahkan semua transaksi yang nilainya di atas 100 ribu.',
      detail: '🔍 **Detail Teknis:**\n\nSintaks: `=SUMIF(range, criteria, [sum_range])`. Jika sum_range tidak ditulis, Excel akan menjumlahkan rentang range itu sendiri.',
      practice: '🏋️ **Latihan Kilat:**\n\nCoba jumlahkan omset khusus cabang "Jakarta" dengan SUMIF di Worksheet Studio!'
    },
    countif: {
      term: 'COUNTIF',
      baby: '🧸 **Bahasa Bayi: COUNTIF**\n\n💡 *Analogi sederhana:* Petugas pintu yang menghitung berapa banyak orang yang memakai baju warna biru.\n\n📖 *Penjelasan:* Menghitung banyaknya kotak yang cocok dengan syarat yang kamu minta.',
      example: '✨ **Contoh Nyata COUNTIF:**\n\n`=COUNTIF(C2:C30, "Hadir")`\nMenghitung berapa hari seorang karyawan hadir selama sebulan.',
      more: '🎯 **Contoh Lain:**\n\n`=COUNTIF(B2:B50, ">=80")`\nMenghitung berapa siswa yang mendapat nilai 80 ke atas.',
      detail: '🔍 **Detail Teknis:**\n\nSintaks: `=COUNTIF(range, criteria)`. Bedanya dengan SUMIF: COUNTIF menghitung "berapa kali", SUMIF menghitung "total jumlah nominal".',
      practice: '🏋️ **Latihan Kilat:**\n\nHitung berapa banyak transaksi berstatus "Lunas" dengan `=COUNTIF(B2:B10, "Lunas")`.'
    },
    vlookup: {
      term: 'VLOOKUP',
      baby: '🧸 **Bahasa Bayi: VLOOKUP**\n\n💡 *Analogi sederhana:* Pelayan resto yang melihat kode makanan di nota pesanan, lalu melihat buku daftar menu untuk mencari nama dan harganya.\n\n📖 *Penjelasan:* Mencari kode di kolom pertama tabel, lalu mengambil data di kolom sebelahnya.',
      example: '✨ **Contoh Nyata VLOOKUP:**\n\n`=VLOOKUP(E2, A2:C10, 2, FALSE)`\nMencari kode barang di E2, lalu mengambil nama barang di kolom ke-2 tabel A2:C10.',
      more: '🎯 **Contoh Lain:**\n\n`=VLOOKUP("BRG01", A2:C10, 3, FALSE)` mengambil harga barang di kolom ke-3.',
      detail: '🔍 **Detail Teknis:**\n\nSintaks: `=VLOOKUP(lookup_value, table_array, col_index, [range_lookup])`. Selalu gunakan FALSE di akhir agar pencarian akurat dan tidak meleset.',
      practice: '🏋️ **Latihan Kilat:**\n\nBuka Worksheet Studio dan coba cocokkan ID Pelanggan dengan Nama Pelanggan memakai VLOOKUP.'
    },
    xlookup: {
      term: 'XLOOKUP',
      baby: '🧸 **Bahasa Bayi: XLOOKUP**\n\n💡 *Analogi sederhana:* Drone serbaguna yang bisa mencari barang ke kiri, kanan, atas, maupun bawah tanpa batasan.\n\n📖 *Penjelasan:* Versi modern pengganti VLOOKUP. Jauh lebih mudah karena tidak perlu menghitung nomor kolom manual dan bisa mencari data ke arah kiri!',
      example: '✨ **Contoh Nyata XLOOKUP:**\n\n`=XLOOKUP(E2, A2:A10, C2:C10, "Tidak Ditemukan")`\nMencari nilai E2 di kolom A, dan langsung mengambil data sejajar di kolom C.',
      more: '🎯 **Contoh Lain:**\n\n`=XLOOKUP(D2, B2:B20, A2:A20)` mencari ke arah kiri tanpa takut rumus rusak saat ada kolom baru disisipkan.',
      detail: '🔍 **Detail Teknis:**\n\nSintaks: `=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])`. Default-nya sudah exact match tanpa perlu menulis FALSE.',
      practice: '🏋️ **Latihan Kilat:**\n\nGunakan XLOOKUP untuk menghubungkan kode member dengan poin reward di Worksheet Studio!'
    },
    filter: {
      term: 'Filter & Sort',
      baby: '🧸 **Bahasa Bayi: Filter & Sort**\n\n💡 *Analogi sederhana:* Sort itu menata barisan murid dari yang terpendek ke tertinggi. Filter itu saringan teh yang menahan daun teh dan cuma meloloskan air teh harum.\n\n📖 *Penjelasan:* Sort mengurutkan data dari A-Z atau terbesar ke terkecil. Filter menyembunyikan baris yang tidak ingin kamu lihat sementara waktu.',
      example: '✨ **Contoh Nyata:**\n\nKlik panah filter di kolom Kota, lalu centang hanya "Surabaya". Seluruh data kota lain disembunyikan sementara tanpa dihapus!',
      more: '🎯 **Contoh Lain:**\n\nSort Descending pada kolom Penjualan untuk langsung melihat siapa sales nomor 1 bulan ini.',
      detail: '🔍 **Detail Teknis:**\n\nPintasan cepat Excel untuk mengaktifkan filter adalah Ctrl + Shift + L.',
      practice: '🏋️ **Latihan Kilat:**\n\nCoba urutkan data omset dari yang paling besar ke kecil di Worksheet Studio!'
    },
    pivottable: {
      term: 'PivotTable',
      baby: '🧸 **Bahasa Bayi: PivotTable**\n\n💡 *Analogi sederhana:* Robot pembuat lego yang menyulap ribuan kepingan berantakan menjadi gedung megah dalam 3 detik.\n\n📖 *Penjelasan:* Alat sakti untuk merangkum ribuan baris data penjualan menjadi tabel ringkas tanpa perlu menulis rumus satu per satu.',
      example: '✨ **Contoh Nyata:**\n\nTarik "Kategori" ke Rows dan "Penjualan" ke Values. Dalam sekejap muncul rekap total omset per kategori produk.',
      more: '🎯 **Contoh Lain:**\n\nUbah tampilan dari per bulan menjadi per cabang hanya dengan menggeser kotak (drag and drop).',
      detail: '🔍 **Detail Teknis:**\n\nMemiliki 4 bidang: Filters, Columns, Rows, dan Values. Di tab ribbon Excel: Insert > PivotTable.',
      practice: '🏋️ **Latihan Kilat:**\n\nBuka modul Level 3 Data Hero untuk mendalami rahasia kecepatan PivotTable!'
    },
    error: {
      term: 'Error Decoder (#DIV/0!, #N/A, #VALUE!)',
      baby: '🧸 **Bahasa Bayi: Tanda Error**\n\n💡 *Analogi sederhana:* Lampu indikator bensin di dashboard mobil: memberitahu kamu bagian mana yang butuh dicek, bukan berarti mobilnya meledak!\n\n📖 *Penjelasan:* Error Excel adalah petunjuk cerdas tempat rumusmu butuh disesuaikan.',
      example: '✨ **Contoh Nyata:**\n\n`#DIV/0!` artinya membagi dengan nol.\n`#N/A` artinya data yang dicari VLOOKUP tidak ketemu.\n`#VALUE!` artinya kamu mencoba mengalikan teks dengan angka.',
      more: '🎯 **Contoh Lain:**\n\nBungkus rumusmu dengan `=IFERROR(rumus, 0)` agar tampilan tabel tetap rapi tanpa tulisan seram!',
      detail: '🔍 **Detail Teknis:**\n\nIFERROR menangkap segala jenis error dan menampilkan teks atau angka alternatif yang ramah.',
      practice: '🏋️ **Latihan Kilat:**\n\nBuka tab Tools > Error Decoder untuk mencoba simulasi menjinakkan error!'
    }
  };

  // Fetch explanation
  const fetchExplanation = async (topicOrQuery: string, mode: 'baby' | 'example' | 'more_example' | 'detail' | 'practice') => {
    setLoading(true);
    setActiveMode(mode);

    // Identify matching key in dictionary
    const clean = topicOrQuery.toLowerCase().trim();
    let matched: string | null = null;
    for (const k of Object.keys(CLIENT_DICTIONARY)) {
      if (clean.includes(k) || k.includes(clean)) {
        matched = k;
        break;
      }
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/explain-baby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: topicOrQuery, mode }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setResponseHtml(data.explanation || 'Berhasil memuat penjelasan.');
        setSourceType(data.source || 'dictionary');
        if (data.dictionaryFallback) {
          setDictionaryData(data.dictionaryFallback);
        }
        setLoading(false);
        return;
      }
    } catch {
      // Graceful fallback to client dictionary below
    }

    // Client dictionary fallback
    if (matched && CLIENT_DICTIONARY[matched]) {
      const entry = CLIENT_DICTIONARY[matched];
      let text = entry.baby;
      if (mode === 'example') text = entry.example;
      else if (mode === 'more_example') text = entry.more;
      else if (mode === 'detail') text = entry.detail;
      else if (mode === 'practice') text = entry.practice;

      setResponseHtml(text);
      setSourceType('dictionary');
    } else {
      setResponseHtml(`🧸 **Bahasa Bayi untuk "${topicOrQuery}"**\n\nDi Excel, setiap kotak kecil adalah **Cell**. Kumpulan kotak disebut **Range**, dan tanda **=** adalah mantra ajaib untuk menyuruh Excel berhitung otomatis.\n\nContoh rumus populer:\n• \`=SUM(A1:A5)\` untuk menjumlahkan angka\n• \`=AVERAGE(A1:A5)\` untuk menghitung rata-rata\n• \`=IF(A1>50, "Bagus", "Coba Lagi")\` untuk aturan logika.\n\nCoba ketik rumus ini langsung di **Worksheet Studio**!`);
      setSourceType('dictionary');
    }
    setLoading(false);
  };

  // Initial fetch when opened
  React.useEffect(() => {
    if (isOpen) {
      fetchExplanation(initialTopic || 'cell', 'baby');
    }
  }, [isOpen, initialTopic]);

  if (!isOpen) return null;

  const handleSelectConcept = (key: string) => {
    setSelectedTopic(key);
    setCustomQuestion('');
    fetchExplanation(key, activeMode);
  };

  const handleSendCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setSelectedTopic(customQuestion);
    fetchExplanation(customQuestion, activeMode);
  };

  const handlePracticeJump = () => {
    onClose();
    if (onNavigateToWorksheet) {
      if (selectedTopic.includes('sum') || selectedTopic === 'sum') {
        onNavigateToWorksheet({
          A1: 'Barang', B1: 'Harga',
          A2: 'Donat', B2: '8000',
          A3: 'Kopi', B3: '15000',
          A4: 'Total Belanja', B4: '=SUM(B2:B3)'
        }, 'B4');
      } else if (selectedTopic.includes('if') || selectedTopic === 'if') {
        onNavigateToWorksheet({
          A1: 'Siswa', B1: 'Nilai', C1: 'Status',
          A2: 'Andi', B2: '85', C2: '=IF(B2>=75, "Lulus", "Remidi")',
          A3: 'Bella', B3: '65', C3: '=IF(B3>=75, "Lulus", "Remidi")'
        }, 'C2');
      } else if (selectedTopic.includes('vlookup') || selectedTopic === 'vlookup') {
        onNavigateToWorksheet({
          A1: 'Kode', B1: 'Menu', C1: 'Harga', D1: '', E1: 'Cari Kode', F1: 'Hasil Nama',
          A2: 'K01', B2: 'Kopi Susu', C2: '18000', D2: '', E2: 'K01', F2: '=VLOOKUP(E2, A2:C2, 2, FALSE)'
        }, 'F2');
      } else {
        onNavigateToWorksheet();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-[#F8DCE9] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#F8DCE9] via-[#FFFAFD] to-[#DDECFF] border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-sm border border-white shrink-0 bg-white">
              <img
                src={mascotImg}
                alt="Kak Questy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#263449] text-base">Tools Bahasa Bayi 🧸</h3>
                <span className="text-[11px] font-semibold text-pink-700 bg-pink-100/80 px-2 py-0.5 rounded-full">
                  Keunikan ExcelQuest
                </span>
              </div>
              <p className="text-xs text-[#5E6D80] mt-0.5">
                Konsep Excel serumit apa pun jadi mudah dipahami dengan analogi sehari-hari!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick concept cards */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#5E6D80] mb-2.5">
              Pilih Konsep atau Istilah Cepat:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {POPULAR_CONCEPTS.map((c) => {
                const isSelected = selectedTopic === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => handleSelectConcept(c.key)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                      isSelected
                        ? 'bg-[#F8DCE9] border-pink-300 text-[#263449] shadow-sm font-semibold'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-base select-none">{c.icon}</span>
                    <span className="truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ask free-form question or paste formula/error */}
          <form onSubmit={handleSendCustomQuestion} className="flex gap-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder="Tulis pertanyaanmu (misal: 'Kenapa muncul #DIV/0?', 'Cara gabung nama orang', 'Apa itu $A$1?')"
              className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-400 focus:bg-white text-slate-900"
            />
            <button
              type="submit"
              disabled={loading || !customQuestion.trim()}
              className="px-4 py-2.5 bg-[#263449] hover:bg-[#1a2534] disabled:opacity-50 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 shrink-0 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Tanya Kak Questy</span>
            </button>
          </form>

          {/* Action buttons (The 5 requested modes) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => fetchExplanation(selectedTopic, 'baby')}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                activeMode === 'baby'
                  ? 'bg-pink-100 border-pink-300 text-pink-900 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              🧸 Jelasin pakai bahasa bayi
            </button>
            <button
              onClick={() => fetchExplanation(selectedTopic, 'example')}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                activeMode === 'example'
                  ? 'bg-sky-100 border-sky-300 text-sky-900 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              💡 Kasih contoh
            </button>
            <button
              onClick={() => fetchExplanation(selectedTopic, 'more_example')}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                activeMode === 'more_example'
                  ? 'bg-purple-100 border-purple-300 text-purple-900 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              🎯 Kasih contoh lain
            </button>
            <button
              onClick={() => fetchExplanation(selectedTopic, 'detail')}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                activeMode === 'detail'
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              🔍 Jelaskan lebih detail
            </button>
            <button
              onClick={handlePracticeJump}
              className="px-3 py-1.5 text-xs rounded-xl font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 flex items-center gap-1 transition-all ml-auto"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Aku mau latihan di Worksheet!</span>
            </button>
          </div>

          {/* Explanation Output Area */}
          <div className="bg-[#FFFAFD] border border-[#F8DCE9] rounded-2xl p-5 shadow-inner min-h-[160px] relative">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-pink-500" />
                <span className="text-xs">Kak Questy sedang menyederhanakan bahasa...</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs text-[#5E6D80]">
                  <span className="font-semibold text-pink-700">
                    {sourceType === 'ai' ? '🤖 Dijawab oleh AI Kak Questy' : '📚 Materi Terverifikasi ExcelQuest'}
                  </span>
                  <span className="text-[11px] text-slate-400">Siap dipraktikkan</span>
                </div>
                <div className="text-sm text-[#263449] leading-relaxed whitespace-pre-wrap font-sans">
                  {responseHtml}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-[#5E6D80]">
          <span>Gunakan tombol latihan untuk menguji pemahaman di spreadsheet interaktif.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
