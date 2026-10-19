import { FormulaFinderEntry } from '../types';

export const FORMULA_FINDER_DATA: FormulaFinderEntry[] = [
  {
    id: 'ff-sum',
    name: 'SUM',
    category: 'Hitung & Statistik',
    userNeedIndonesian: 'Menjumlahkan kumpulan angka atau total penjualan',
    simpleUtility: 'Menambahkan semua angka di sekumpulan sel sekaligus tanpa perlu mengetik tanda tambah satu per satu.',
    syntax: '=SUM(number1, [number2], ...)',
    parameters: [
      { name: 'number1', desc: 'Sel pertama atau rentang sel yang ingin dijumlahkan (misal A1:A10)' },
      { name: 'number2', desc: 'Tambahan sel atau rentang lain (opsional)', optional: true }
    ],
    example: '=SUM(B2:B10)',
    exampleExplanation: 'Menjumlahkan semua angka dari baris B2 sampai B10 secara otomatis.',
    commonMistakes: [
      'Mengetik =SUM(A1+A2) — tanda tambah tidak perlu di dalam kurung SUM, cukup =SUM(A1:A2).',
      'Sel berisi teks "100rb" yang membuat SUM mengabaikannya sehingga hasilnya 0.',
      'Lupa menutup kurung saat menulis rumus panjang.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Barang', B1: 'Harga',
        A2: 'Buku', B2: '15000',
        A3: 'Pena', B3: '5000',
        A4: 'Penghapus', B4: '3000',
        A5: 'Total', B5: '=SUM(B2:B4)'
      },
      targetCell: 'B5',
      presetFormula: '=SUM(B2:B4)'
    }
  },
  {
    id: 'ff-average',
    name: 'AVERAGE',
    category: 'Hitung & Statistik',
    userNeedIndonesian: 'Menghitung rata-rata nilai rapor, pengeluaran harian, atau performa',
    simpleUtility: 'Menjumlahkan semua angka lalu membaginya dengan jumlah kotak yang berisi angka.',
    syntax: '=AVERAGE(number1, [number2], ...)',
    parameters: [
      { name: 'number1', desc: 'Rentang sel berisi nilai yang ingin dicari rata-ratanya (misal B2:B6)' }
    ],
    example: '=AVERAGE(C2:C30)',
    exampleExplanation: 'Menghitung nilai rerata ujian siswa dari baris C2 sampai C30.',
    commonMistakes: [
      'Sel kosong vs sel berisi angka 0: Excel mengabaikan sel kosong, tapi menghitung sel bernilai 0 sehingga nilai rata-rata bisa turun.',
      'Memasukkan sel berformat teks.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Siswa', B1: 'Nilai Ujian',
        A2: 'Alya', B2: '80',
        A3: 'Bima', B3: '90',
        A4: 'Cahya', B4: '70',
        A5: 'Rata-rata', B5: '=AVERAGE(B2:B4)'
      },
      targetCell: 'B5',
      presetFormula: '=AVERAGE(B2:B4)'
    }
  },
  {
    id: 'ff-min-max',
    name: 'MAX & MIN',
    category: 'Hitung & Statistik',
    userNeedIndonesian: 'Menemukan nilai tertinggi (juara) atau nilai terendah (paling hemat)',
    simpleUtility: 'MAX mengambil angka terbesar, MIN mengambil angka terkecil dari sekumpulan data.',
    syntax: '=MAX(range) atau =MIN(range)',
    parameters: [
      { name: 'range', desc: 'Area sel yang ingin diperiksa' }
    ],
    example: '=MAX(D2:D100) dan =MIN(D2:D100)',
    exampleExplanation: 'Menemukan skor penjualan terbaik tim dan skor terendah untuk evaluasi.',
    commonMistakes: [
      'Mengira MAX bisa mengembalikan nama orangnya langsung (MAX hanya mengembalikan angkanya; gunakan INDEX-MATCH/XLOOKUP untuk mencari nama).'
    ],
    worksheetPreset: {
      data: {
        A1: 'Karyawan', B1: 'Penjualan (Rp)',
        A2: 'Doni', B2: '25000000',
        A3: 'Eka', B3: '42000000',
        A4: 'Fitri', B4: '18000000',
        A5: 'Tertinggi (MAX)', B5: '=MAX(B2:B4)',
        A6: 'Terendah (MIN)', B6: '=MIN(B2:B4)'
      },
      targetCell: 'B5',
      presetFormula: '=MAX(B2:B4)'
    }
  },
  {
    id: 'ff-count-counta',
    name: 'COUNT & COUNTA',
    category: 'Hitung & Statistik',
    userNeedIndonesian: 'Menghitung berapa banyak baris transaksi atau jumlah data yang terisi',
    simpleUtility: 'COUNT menghitung kotak yang berisi ANGKA, sedangkan COUNTA menghitung semua kotak yang TIDAK KOSONG (teks, angka, simbol).',
    syntax: '=COUNT(range) atau =COUNTA(range)',
    parameters: [
      { name: 'range', desc: 'Rentang sel yang dihitung banyaknya' }
    ],
    example: '=COUNTA(A2:A50)',
    exampleExplanation: 'Menghitung total siswa yang terdaftar di kolom Nama (teks).',
    commonMistakes: [
      'Memakai COUNT untuk kolom nama orang (hasilnya 0 karena nama adalah teks, seharusnya pakai COUNTA).'
    ],
    worksheetPreset: {
      data: {
        A1: 'Nama Mahasiswa', B1: 'Nilai',
        A2: 'Gilang', B2: '85',
        A3: 'Hana', B3: '',
        A4: 'Irfan', B4: '92',
        A5: 'Total Mahasiswa', B5: '=COUNTA(A2:A4)',
        A6: 'Sudah Punya Nilai', B6: '=COUNT(B2:B4)'
      },
      targetCell: 'B5',
      presetFormula: '=COUNTA(A2:A4)'
    }
  },
  {
    id: 'ff-if',
    name: 'IF',
    category: 'Logika & Syarat',
    userNeedIndonesian: 'Membuat keputusan otomatis: jika kondisi terpenuhi lakukan A, jika tidak lakukan B',
    simpleUtility: 'Memberi logika bersyarat pada spreadsheet seperti kelulusan, diskon, atau reward.',
    syntax: '=IF(logical_test, value_if_true, [value_if_false])',
    parameters: [
      { name: 'logical_test', desc: 'Kondisi yang diuji (misal B2 >= 75)' },
      { name: 'value_if_true', desc: 'Teks atau angka jika kondisi BENAR' },
      { name: 'value_if_false', desc: 'Teks atau angka jika kondisi SALAH', optional: true }
    ],
    example: '=IF(B2>=75, "LULUS", "REMIDIAL")',
    exampleExplanation: 'Jika nilai ujian >= 75 tampilkan "LULUS", selain itu "REMIDIAL".',
    commonMistakes: [
      'Lupa memberi tanda petik dua (") pada teks (misal menulis =IF(A1>5, Lulus, Gagal) akan memicu error #NAME?).',
      'Terbalik urutan parameter true dan false.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Siswa', B1: 'Nilai', C1: 'Status',
        A2: 'Joko', B2: '82', C2: '=IF(B2>=75, "Lulus", "Remidi")',
        A3: 'Kiki', B3: '68', C3: '=IF(B3>=75, "Lulus", "Remidi")'
      },
      targetCell: 'C2',
      presetFormula: '=IF(B2>=75, "Lulus", "Remidi")'
    }
  },
  {
    id: 'ff-sumif',
    name: 'SUMIF',
    category: 'Logika & Syarat',
    userNeedIndonesian: 'Menjumlahkan angka dengan syarat tertentu (misal total omset khusus produk Kopi)',
    simpleUtility: 'Menjumlahkan nilai hanya pada baris yang memenuhi satu kriteria spesifik.',
    syntax: '=SUMIF(range, criteria, [sum_range])',
    parameters: [
      { name: 'range', desc: 'Rentang sel yang diperiksa kriterianya (misal Kolom Kategori)' },
      { name: 'criteria', desc: 'Syarat yang dicari (misal "Kopi" atau ">100000")' },
      { name: 'sum_range', desc: 'Rentang angka yang dijumlahkan (misal Kolom Omset)', optional: true }
    ],
    example: '=SUMIF(A2:A20, "Kopi", B2:B20)',
    exampleExplanation: 'Mencari kata "Kopi" di kolom A, lalu menjumlahkan angka di kolom B pada baris yang sama.',
    commonMistakes: [
      'Ukuran range dan sum_range berbeda panjangnya (misal A2:A10 vs B2:B20).',
      'Lupa tanda petik pada kriteria bertanda matematika (misal ">50" bukan >50).'
    ],
    worksheetPreset: {
      data: {
        A1: 'Kategori', B1: 'Omset',
        A2: 'Makanan', B2: '50000',
        A3: 'Minuman', B3: '35000',
        A4: 'Makanan', B4: '80000',
        A5: 'Total Makanan', B5: '=SUMIF(A2:A4, "Makanan", B2:B4)'
      },
      targetCell: 'B5',
      presetFormula: '=SUMIF(A2:A4, "Makanan", B2:B4)'
    }
  },
  {
    id: 'ff-countif',
    name: 'COUNTIF',
    category: 'Logika & Syarat',
    userNeedIndonesian: 'Menghitung berapa kali suatu kondisi muncul (misal berapa kali siswa hadir)',
    simpleUtility: 'Menghitung banyaknya kotak yang cocok dengan kriteria yang ditentukan.',
    syntax: '=COUNTIF(range, criteria)',
    parameters: [
      { name: 'range', desc: 'Rentang sel yang dihitung' },
      { name: 'criteria', desc: 'Syarat yang dicari (misal "Hadir" atau ">=80")' }
    ],
    example: '=COUNTIF(C2:C31, "Hadir")',
    exampleExplanation: 'Menghitung berapa hari seorang karyawan hadir selama sebulan penuh.',
    commonMistakes: [
      'Menulis rentang kriteria terbalik atau memakai tanda titik dua yang salah.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Hari', B1: 'Status',
        A2: 'Senin', B2: 'Hadir',
        A3: 'Selasa', B3: 'Izin',
        A4: 'Rabu', B4: 'Hadir',
        A5: 'Total Hadir', B5: '=COUNTIF(B2:B4, "Hadir")'
      },
      targetCell: 'B5',
      presetFormula: '=COUNTIF(B2:B4, "Hadir")'
    }
  },
  {
    id: 'ff-vlookup',
    name: 'VLOOKUP',
    category: 'Lookup & Referensi',
    userNeedIndonesian: 'Menemukan data berdasarkan kode ID di tabel referensi vertikal',
    simpleUtility: 'Mencari kode di kolom pertama tabel, lalu mengambil informasi di kolom sebelah kanannya.',
    syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    parameters: [
      { name: 'lookup_value', desc: 'Kode atau kata kunci yang dicari (misal B2)' },
      { name: 'table_array', desc: 'Tabel referensi data (misal A2:D100)' },
      { name: 'col_index_num', desc: 'Nomor kolom yang ingin diambil datanya (angka 1, 2, 3...)' },
      { name: 'range_lookup', desc: 'Gunakan FALSE atau 0 untuk pencarian persis eksak' }
    ],
    example: '=VLOOKUP("BRG01", A2:C10, 2, FALSE)',
    exampleExplanation: 'Mencari "BRG01" di kolom A, lalu mengambil nama produk di kolom ke-2 tabel A2:C10.',
    commonMistakes: [
      'Lupa menulis FALSE di ujung rumus, sehingga Excel mencari nilai aproksimasi yang sering keliru.',
      'Kolom kunci pencarian tidak berada di kolom paling kiri (kolom pertama) dari tabel referensi.',
      'Menghapus atau menyisipkan kolom baru yang membuat nomor col_index_num meleset.'
    ],
    worksheetPreset: {
      data: {
        A1: 'ID', B1: 'Nama Barang', C1: 'Harga', D1: '', E1: 'Cari ID', F1: 'Hasil Nama',
        A2: 'B01', B2: 'Mouse', C2: '50000', D2: '', E2: 'B02', F2: '=VLOOKUP(E2, A2:C3, 2, FALSE)',
        A3: 'B02', B3: 'Keyboard', C3: '120000', D3: '', E3: '', F3: ''
      },
      targetCell: 'F2',
      presetFormula: '=VLOOKUP(E2, A2:C3, 2, FALSE)'
    }
  },
  {
    id: 'ff-xlookup',
    name: 'XLOOKUP',
    category: 'Lookup & Referensi',
    userNeedIndonesian: 'Mencari data ke arah mana saja (kanan/kiri) secara fleksibel tanpa takut kolom geser',
    simpleUtility: 'Versi modern dan penyempurna VLOOKUP yang jauh lebih mudah digunakan dan tahan banting.',
    syntax: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])',
    parameters: [
      { name: 'lookup_value', desc: 'Nilai yang ingin dicari' },
      { name: 'lookup_array', desc: 'Kolom tempat mencari kode (misal A2:A10)' },
      { name: 'return_array', desc: 'Kolom hasil yang ingin diambil (misal C2:C10)' },
      { name: 'if_not_found', desc: 'Teks cadangan jika data tidak ketemu (misal "Tidak Ditemukan")', optional: true }
    ],
    example: '=XLOOKUP(E2, A2:A10, C2:C10, "Data Tidak Ada")',
    exampleExplanation: 'Mencari nilai E2 di kolom A, dan langsung mengambil data sejajar di kolom C tanpa perlu menghitung nomor kolom.',
    commonMistakes: [
      'Panjang lookup_array dan return_array tidak sama (misal A2:A10 vs C2:C15).'
    ],
    worksheetPreset: {
      data: {
        A1: 'ID Member', B1: 'Nama Pelanggan', C1: 'Poin', D1: '', E1: 'Input ID', F1: 'Hasil Poin',
        A2: 'M-101', B2: 'Sinta', C2: '450', D2: '', E2: 'M-102', F2: '=XLOOKUP(E2, A2:A3, C2:C3, "Belum Ada")',
        A3: 'M-102', B3: 'Bayu', C3: '820', D3: '', E3: '', F3: ''
      },
      targetCell: 'F2',
      presetFormula: '=XLOOKUP(E2, A2:A3, C2:C3, "Belum Ada")'
    }
  },
  {
    id: 'ff-concat',
    name: 'CONCAT & & (Ampersand)',
    category: 'Teks',
    userNeedIndonesian: 'Menggabungkan teks dari beberapa sel menjadi satu kalimat utuh',
    simpleUtility: 'Menyambungkan kata seperti Nama Depan dan Nama Belakang atau membuat ID unik.',
    syntax: '=CONCAT(text1, [text2], ...) atau =A1 & " " & B1',
    parameters: [
      { name: 'text1', desc: 'Teks atau sel pertama' },
      { name: 'text2', desc: 'Teks atau sel berikutnya' }
    ],
    example: '=A2 & " " & B2',
    exampleExplanation: 'Menggabungkan "Radit" di A2 dan "Pratama" di B2 menjadi "Radit Pratama".',
    commonMistakes: [
      'Lupa menambahkan spasi pemisah " ", sehingga nama menyatu jadi "RaditPratama".'
    ],
    worksheetPreset: {
      data: {
        A1: 'Depan', B1: 'Belakang', C1: 'Nama Lengkap',
        A2: 'Nadia', B2: 'Safitri', C2: '=A2 & " " & B2',
        A3: 'Rizky', B3: 'Ramadhan', C3: '=A3 & " " & B3'
      },
      targetCell: 'C2',
      presetFormula: '=A2 & " " & B2'
    }
  },
  {
    id: 'ff-left-right-mid',
    name: 'LEFT, RIGHT, MID',
    category: 'Teks',
    userNeedIndonesian: 'Mengambil beberapa huruf dari kode produk atau nomor faktur',
    simpleUtility: 'LEFT mengambil dari kiri, RIGHT dari kanan, dan MID mengambil dari tengah teks.',
    syntax: '=LEFT(text, num_chars) / =RIGHT(text, num_chars) / =MID(text, start_num, num_chars)',
    parameters: [
      { name: 'text', desc: 'Sel teks yang ingin dipotong' },
      { name: 'num_chars', desc: 'Berapa banyak karakter yang diambil' }
    ],
    example: '=LEFT("INV-2026-001", 3)',
    exampleExplanation: 'Menghasilkan "INV" (kode jenis dokumen invoice).',
    commonMistakes: [
      'Lupa bahwa tanda spasi dan tanda minus (-) juga dihitung sebagai satu karakter.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Kode Faktur', B1: 'Kategori (LEFT)',
        A2: 'INV-8891', B2: '=LEFT(A2, 3)',
        A3: 'REC-4412', B3: '=LEFT(A3, 3)'
      },
      targetCell: 'B2',
      presetFormula: '=LEFT(A2, 3)'
    }
  },
  {
    id: 'ff-iferror',
    name: 'IFERROR',
    category: 'Logika & Syarat',
    userNeedIndonesian: 'Mencegah munculnya pesan error seram (#N/A, #DIV/0!) di tabel laporan',
    simpleUtility: 'Menangkap error dan menggantinya dengan nilai bersih yang ramah seperti angka 0 atau teks rapi.',
    syntax: '=IFERROR(value, value_if_error)',
    parameters: [
      { name: 'value', desc: 'Rumus utama yang ingin diamankan (misal rumus VLOOKUP atau pembagian)' },
      { name: 'value_if_error', desc: 'Tampilan pengganti jika rumus utama error (misal 0 atau "-")' }
    ],
    example: '=IFERROR(A2/B2, 0)',
    exampleExplanation: 'Jika B2 bernilai 0 (yang biasanya menghasilkan #DIV/0!), rumus akan menampilkan 0 tanpa merusak tabel.',
    commonMistakes: [
      'Menyembunyikan error logika penting yang seharusnya diperbaiki akar masalahnya.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Omset', B1: 'Pengunjung', C1: 'Omset per Orang',
        A2: '500000', B2: '0', C2: '=IFERROR(A2/B2, 0)'
      },
      targetCell: 'C2',
      presetFormula: '=IFERROR(A2/B2, 0)'
    }
  },
  {
    id: 'ff-today',
    name: 'TODAY & NOW',
    category: 'Tanggal & Waktu',
    userNeedIndonesian: 'Menampilkan tanggal hari ini secara otomatis atau menghitung umur/jatuh tempo',
    simpleUtility: 'Mengambil tanggal sistem hari ini tanpa perlu mengetik tanggal manual tiap hari.',
    syntax: '=TODAY()',
    parameters: [],
    example: '=TODAY()',
    exampleExplanation: 'Menampilkan tanggal saat ini secara dinamis setiap kali spreadsheet dibuka.',
    commonMistakes: [
      'Lupa menuliskan kurung buka-tutup () di belakang TODAY.'
    ],
    worksheetPreset: {
      data: {
        A1: 'Keterangan', B1: 'Tanggal',
        A2: 'Hari Ini', B2: '=TODAY()'
      },
      targetCell: 'B2',
      presetFormula: '=TODAY()'
    }
  }
];
