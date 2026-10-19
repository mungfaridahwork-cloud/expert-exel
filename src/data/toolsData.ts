import { Flashcard, ExcelErrorGuide, ExcelTemplate } from '../types';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Dasar',
    front: 'Bagaimana cara menjumlahkan sel A1 sampai A10?',
    back: '=SUM(A1:A10)',
    babyHint: 'Gunakan asisten SUM dan titik dua (:) untuk rentang kotak.'
  },
  {
    id: 'fc-2',
    category: 'Dasar',
    front: 'Bagaimana cara menghitung rata-rata nilai dari B2 sampai B20?',
    back: '=AVERAGE(B2:B20)',
    babyHint: 'Hakim adil yang membagi rata permen ke semua anak.'
  },
  {
    id: 'fc-3',
    category: 'Logika',
    front: 'Tulis rumus IF: Jika umur di sel A2 >= 17 maka "DEWASA", selain itu "ANAK".',
    back: '=IF(A2>=17, "DEWASA", "ANAK")',
    babyHint: 'Satpam KTP: kalau syarat terpenuhi pilih kata pertama, kalau tidak pilih kata kedua.'
  },
  {
    id: 'fc-4',
    category: 'Lookup',
    front: 'Cari kode "X1" di tabel A2:C10 dan ambil data di kolom ke-3 secara eksak.',
    back: '=VLOOKUP("X1", A2:C10, 3, FALSE)',
    babyHint: 'Pelayan resto: nilai cari, area menu tabel, kolom ke berapa, dan jangan lupa FALSE.'
  },
  {
    id: 'fc-5',
    category: 'Teks',
    front: 'Gabungkan kata di sel A1 dan B1 dengan spasi pemisah di tengahnya.',
    back: '=A1 & " " & B1 atau =CONCAT(A1, " ", B1)',
    babyHint: 'Gunakan lem ampersand (&) dan jangan lupa " " untuk spasi.'
  },
  {
    id: 'fc-6',
    category: 'Referensi',
    front: 'Bagaimana cara mengunci sel C1 agar tidak bergeser saat dicopy ke bawah?',
    back: '=$C$1 (Absolute Reference)',
    babyHint: 'Beri paku dollar ($) di depan huruf kolom dan angka baris.'
  },
  {
    id: 'fc-7',
    category: 'Logika',
    front: 'Jumlahkan angka di B2:B10 hanya jika kolom A2:A10 bertuliskan "Lunas".',
    back: '=SUMIF(A2:A10, "Lunas", B2:B10)',
    babyHint: 'Kasir yang cuma mau menjumlahkan transaksi berlabel Lunas.'
  },
  {
    id: 'fc-8',
    category: 'Trik Error',
    front: 'Bagaimana cara menyembunyikan tulisan #DIV/0! dan menggantinya dengan angka 0?',
    back: '=IFERROR(rumus, 0)',
    babyHint: 'Jaring sirkus IFERROR yang menangkap akrobat terjatuh.'
  }
];

export const ERROR_GUIDES: ExcelErrorGuide[] = [
  {
    errorCode: '#DIV/0!',
    meaning: 'Division by Zero (Pembagian dengan Nol)',
    babyAnalogy: 'Kamu punya 10 potong kue tapi mau dibagikan ke 0 orang anak. Bingung kan? Komputer pun bingung membagi dengan hampa.',
    causes: [
      'Ada rumus pembagian (/) di mana pembaginya bernilai 0 atau sel pembagi masih kosong.',
      'Fungsi AVERAGE pada rentang sel yang semuanya kosong atau teks.'
    ],
    solutions: [
      'Pastikan sel pembagi sudah terisi angka lebih dari 0.',
      'Gunakan IFERROR: =IFERROR(A1/B1, 0) agar menampilkan 0 jika belum ada data.'
    ],
    exampleBad: '=100/0',
    exampleGood: '=IFERROR(100/A1, 0)',
    fixExercise: {
      initialData: {
        A1: 'Omset', B1: 'Tamu', C1: 'Rata-rata',
        A2: '500000', B2: '0', C2: '=A2/B2'
      },
      brokenCell: 'C2',
      instruction: 'Perbaiki rumus di sel C2 agar tidak memunculkan #DIV/0! saat B2 bernilai 0 dengan membungkusnya memakai IFERROR: =IFERROR(A2/B2, 0)',
      targetValue: 0
    }
  },
  {
    errorCode: '#VALUE!',
    meaning: 'Wrong Data Type (Salah Tipe Data)',
    babyAnalogy: 'Mencoba mengalikan apel dengan sandal jepit. Excel tidak bisa menghitung perkalian antara angka dan kata-kata!',
    causes: [
      'Menjumlahkan teks dan angka secara manual, contoh: ="Sepatu" + 50000.',
      'Salah satu sel numerik sengaja diketik dengan huruf "100rb" atau spasi tak kasat mata.'
    ],
    solutions: [
      'Pastikan semua sel yang terlibat operasi matematika murni berisi angka.',
      'Gunakan fungsi SUM (karena SUM otomatis mengabaikan teks, sedangkan tanda + manual akan error).'
    ],
    exampleBad: '="Buku" * 15000',
    exampleGood: '=SUM(A1:A5)',
    fixExercise: {
      initialData: {
        A1: 'Harga', B1: 'Jumlah', C1: 'Total',
        A2: '25000', B2: 'dua', C2: '=A2*B2'
      },
      brokenCell: 'B2',
      instruction: 'Ganti isi sel B2 dari kata "dua" menjadi angka murni 2 agar perkalian di C2 berhasil!',
      targetValue: 50000
    }
  },
  {
    errorCode: '#N/A',
    meaning: 'Not Available (Nilai Tidak Ditemukan)',
    babyAnalogy: 'Pelayan resto mencari menu "Pizza Rendang" di buku menu, tapi menu itu memang tidak ada terdaftar.',
    causes: [
      'VLOOKUP atau XLOOKUP mencari kode yang tidak tercatat di tabel master.',
      'Ada spasi tersembunyi di awal/akhir kode (misal "BRG01 " vs "BRG01").'
    ],
    solutions: [
      'Cek ejaan kode yang dicari dan pastikan tabel master lengkap.',
      'Gunakan IFERROR: =IFERROR(VLOOKUP(...), "Data Tidak Ditemukan").'
    ],
    exampleBad: '=VLOOKUP("BRG99", A2:C5, 2, FALSE)',
    exampleGood: '=IFERROR(VLOOKUP("BRG99", A2:C5, 2, FALSE), "Tidak Ada")',
    fixExercise: {
      initialData: {
        A1: 'Kode', B1: 'Nama', C1: '', D1: 'Cari', E1: 'Hasil',
        A2: 'K01', B2: 'Kopi', C2: '', D2: 'K99', E2: '=VLOOKUP(D2, A2:B2, 2, FALSE)'
      },
      brokenCell: 'D2',
      instruction: 'Ganti kode pencarian di sel D2 menjadi "K01" agar VLOOKUP menemukan data namanya!',
      targetValue: 'Kopi'
    }
  },
  {
    errorCode: '#REF!',
    meaning: 'Invalid Cell Reference (Referensi Sel Terhapus)',
    babyAnalogy: 'Kamu menunjuk ke rumah nomor 5, tapi semalam rumah itu sudah digusur habis. Tunjukannya jadi hilang arah.',
    causes: [
      'Baris atau kolom yang dijadikan referensi rumus baru saja kamu hapus (Delete Row/Column).',
      'Menyalin rumus ke sel yang membuat referensi melompat keluar dari lembar kerja.'
    ],
    solutions: [
      'Tekan Ctrl+Z (Undo) jika baru saja tidak sengaja menghapus kolom/baris.',
      'Tulis ulang rumus dengan referensi sel baru yang masih ada.'
    ],
    exampleBad: '=A1 + #REF!',
    exampleGood: '=A1 + B1'
  },
  {
    errorCode: '#NAME?',
    meaning: 'Unrecognized Formula Name (Salah Ketik Nama Rumus)',
    babyAnalogy: 'Kamu memanggil temanmu "Budi" dengan nama "Bodiii", dia tidak menoleh karena tidak kenal nama itu.',
    causes: [
      'Typo nama rumus, misalnya mengetik =SUMM(A1:A5) atau =AVERGE(A1:A5).',
      'Lupa tanda petik dua pada teks, misalnya =IF(A1>5, Lulus, Gagal) — Excel mengira Lulus adalah nama rumus.'
    ],
    solutions: [
      'Periksa kembali ejaan rumus.',
      'Pastikan teks diapit petik dua: "Lulus".'
    ],
    exampleBad: '=SUMM(A1:A5)',
    exampleGood: '=SUM(A1:A5)'
  },
  {
    errorCode: '#####',
    meaning: 'Column Too Narrow (Kolom Kurang Lebar)',
    babyAnalogy: 'Orang berbadan besar mencoba masuk ke pintu lift yang cuma terbuka sejengkal.',
    causes: [
      'Angka atau format tanggal terlalu panjang untuk lebar kolom saat ini.',
      'Perhitungan tanggal menghasilkan nilai minus (di Excel tanggal tidak boleh negatif).'
    ],
    solutions: [
      'Arahkan kursor ke batas garis antar kolom (misal antara A dan B) lalu Double-Click untuk Auto-fit lebar kolom.',
      'Tarik batas kolom ke kanan agar lebih lebar.'
    ],
    exampleBad: '123456789000 di kolom selebar 3 karakter',
    exampleGood: 'Perlebar kolom dengan double click header kolom'
  }
];

export const GLOSSARY_TERMS = [
  { term: 'Cell', definition: 'Kotak tunggal pertemuan kolom dan baris tempat menyimpan satu potong data teks, angka, atau formula.' },
  { term: 'Range', definition: 'Kumpulan dua sel atau lebih yang dipilih bersamaan, ditulis dengan tanda titik dua (contoh A1:C5).' },
  { term: 'Workbook', definition: 'File dokumen Excel utuh yang bisa menampung banyak lembar kerja (worksheet).' },
  { term: 'Worksheet', definition: 'Satu lembar kerja bertab kisi-kisi tempat tabel berada di dalam workbook.' },
  { term: 'Formula Bar', definition: 'Bilah input di atas kisi-kisi untuk melihat dan menyunting isi rumus matematika sel aktif.' },
  { term: 'Absolute Reference ($)', definition: 'Penguncian alamat sel memakai simbol dollar ($A$1) agar tidak bergeser saat dicopy autofill.' },
  { term: 'AutoFill', definition: 'Menarik kotak kecil di sudut kanan bawah sel (fill handle) untuk meneruskan deret atau menyalin rumus ke bawah.' },
  { term: 'VLOOKUP', definition: 'Fungsi pencarian data secara vertikal dari kolom paling kiri tabel referensi.' },
  { term: 'XLOOKUP', definition: 'Fungsi pencarian modern yang fleksibel ke kiri/kanan tanpa perlu menghitung nomor kolom manual.' },
  { term: 'SUMIF', definition: 'Menjumlahkan angka yang hanya memenuhi satu kriteria tertentu.' },
  { term: 'COUNTIF', definition: 'Menghitung frekuensi kemunculan data yang sesuai dengan syarat yang diminta.' },
  { term: 'PivotTable', definition: 'Alat bantu interaktif untuk merangkum dan menganalisis ribuan baris data transaksi dalam sekejap.' },
  { term: 'Data Validation', definition: 'Pembatasan jenis data yang boleh diinput pengguna, seperti membuat Dropdown Menu.' },
  { term: 'Conditional Formatting', definition: 'Aturan pewarnaan sel secara otomatis berbasis nilai (misal merah jika rugi, hijau jika untung).' },
  { term: 'IFERROR', definition: 'Pelindung rumus yang menangkap pesan error dan menggantinya dengan tampilan cadangan yang rapi.' }
];

export const TEMPLATES_DATA: ExcelTemplate[] = [
  {
    id: 'tmpl-budget',
    title: 'Budget Bulanan Personal',
    category: 'Keuangan',
    description: 'Template pencatat uang saku, biaya kos, tabungan, dan kalkulasi defisit/surplus otomatis.',
    sheetData: {
      A1: 'POS PENGELUARAN', B1: 'ANGGARAN', C1: 'REALISASI', D1: 'SELISIH',
      A2: 'Kost & Listrik', B2: '1200000', C2: '1200000', D2: '=B2-C2',
      A3: 'Makan & Minum', B3: '1000000', C3: '950000', D3: '=B3-C3',
      A4: 'Transportasi', B4: '300000', C4: '280000', D4: '=B4-C4',
      A5: 'Hiburan', B5: '200000', C5: '250000', D5: '=B5-C5',
      A6: 'Tabungan', B6: '500000', C6: '500000', D6: '=B6-C6',
      A7: 'TOTAL', B7: '=SUM(B2:B6)', C7: '=SUM(C2:C6)', D7: '=B7-C7'
    }
  },
  {
    id: 'tmpl-stock',
    title: 'Pengelolaan Stok & Restock Gudang',
    category: 'Inventaris',
    description: 'Pantau sisa barang dan dapatkan alert RESTOCK otomatis jika stok berada di bawah batas aman.',
    sheetData: {
      A1: 'SKU', B1: 'NAMA BARANG', C1: 'STOK AWAL', D1: 'KELUAR', E1: 'SISA', F1: 'SAFETY', G1: 'STATUS',
      A2: 'ATK-01', B2: 'Kertas HVS A4', C2: '100', D2: '85', E2: '=C2-D2', F2: '20', G2: '=IF(E2<=F2, "RESTOCK", "AMAN")',
      A3: 'ATK-02', B3: 'Tinta Printer', C3: '40', D3: '15', E3: '=C3-D3', F3: '10', G3: '=IF(E3<=F3, "RESTOCK", "AMAN")',
      A4: 'ATK-03', B4: 'Bolpoin Gel Hitam', C4: '120', D4: '115', E4: '=C4-D4', F4: '25', G4: '=IF(E4<=F4, "RESTOCK", "AMAN")'
    }
  },
  {
    id: 'tmpl-absensi',
    title: 'Rekap Absensi & Kehadiran Mingguan',
    category: 'SDM / HR',
    description: 'Catat absensi tim Senin-Jumat dan hitung total hari kehadiran dengan COUNTIF otomatis.',
    sheetData: {
      A1: 'NAMA', B1: 'SEN', C1: 'SEL', D1: 'RAB', E1: 'KAM', F1: 'JUM', G1: 'HADIR', H1: 'STATUS',
      A2: 'Arya', B2: 'H', C2: 'H', D2: 'H', E2: 'H', F2: 'H', G2: '=COUNTIF(B2:F2, "H")', H2: '=IF(G2=5, "Penuh", "Ada Absen")',
      A3: 'Bella', B3: 'H', C3: 'I', D3: 'H', E3: 'H', F3: 'H', G3: '=COUNTIF(B3:F3, "H")', H3: '=IF(G3=5, "Penuh", "Ada Absen")',
      A4: 'Cici', B4: 'H', C4: 'H', D4: 'S', E4: 'H', F4: 'H', G4: '=COUNTIF(B4:F4, "H")', H4: '=IF(G4=5, "Penuh", "Ada Absen")'
    }
  },
  {
    id: 'tmpl-sales',
    title: 'Laporan Penjualan Kasir Sederhana',
    category: 'Penjualan',
    description: 'Catat transaksi produk, harga satuan, subtotal, dan grand total omset harian kasir.',
    sheetData: {
      A1: 'ITEM', B1: 'QTY', C1: 'HARGA', D1: 'SUBTOTAL',
      A2: 'Roti Panggang', B2: '12', C2: '15000', D2: '=B2*C2',
      A3: 'Kopi Susu Dingin', B3: '25', C3: '18000', D3: '=B3*C3',
      A4: 'Teh Melati', B4: '8', C4: '10000', D4: '=B4*C4',
      A5: 'GRAND TOTAL', B5: '=SUM(B2:B4)', C5: '', D5: '=SUM(D2:D4)'
    }
  }
];
