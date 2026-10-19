import { LearningModule } from '../types';

export const LEARNING_MODULES: LearningModule[] = [
  // LEVEL 1: STARTER
  {
    id: 'l1-m1',
    level: 1,
    levelName: 'Level 1 — Starter',
    title: 'Anatomi Excel: Workbook, Sheet, Baris, Kolom & Cell',
    description: 'Pahami fondasi dasar peta spreadsheet sebelum mulai berhitung.',
    durationMinutes: 10,
    xpReward: 50,
    babyAnalogy: 'Excel itu ibarat lemari bento raksasa. Workbook adalah lemarinya, Worksheet adalah laci-lacinya, dan Cell adalah sekat kotak makan tempat menyimpan satu sendok lauk.',
    objectives: [
      'Membedakan Workbook (file) dan Worksheet (lembar kerja tab).',
      'Mengenal koordinat Kolom (A, B, C...) dan Baris (1, 2, 3...).',
      'Memahami konsep Cell (kotak tunggal pertemuan kolom dan baris).'
    ],
    simpleExplanation: 'Di Excel, semua data tersusun rapi dalam kotak-kotak kecil bernama Cell. Tiap sel punya alamat unik berupa gabungan huruf kolom dan nomor baris, contohnya A1 (kolom A, baris 1) atau C5 (kolom C, baris 5). Mengklik kotak sama dengan memilih alamat tersebut.',
    exampleData: {
      headers: ['A (Nama)', 'B (Kelas)', 'C (Nilai)'],
      rows: [
        ['Rian', '10-A', 85],
        ['Siti', '10-B', 92],
        ['Budi', '10-A', 78]
      ],
      formulaDemo: 'Klik kotak A1',
      resultDemo: 'Isinya teks "Nama"'
    },
    exercise: {
      instruction: 'Ketik nama barang favoritmu di sel A1 (misal "Laptop"), lalu di sel B1 masukkan jumlahnya (misal "2"). Coba cek alamat sel yang sedang aktif di formula bar!',
      targetCell: 'B1',
      expectedFormulaPattern: /^[0-9]+$/,
      expectedValue: 2,
      initialData: {
        A1: 'Laptop',
        B1: '2'
      },
      hints: [
        'Klik sel B1 langsung di spreadsheet.',
        'Ketik angka 2 lalu tekan tombol Enter.',
        'Perhatikan kotak nama di kiri atas formula bar akan menampilkan B1.'
      ],
      solutionExplanation: 'Sel B1 kini menyimpan nilai angka 2. Alamat B1 dibentuk dari pertemuan kolom B dan baris 1.'
    },
    completionCriteria: [
      'Berhasil memilih sel tertentu pada lembar kerja.',
      'Memahami cara membaca alamat koordinat kolom dan baris.',
      'Bisa memasukkan teks dan angka ke dalam sel yang benar.'
    ]
  },
  {
    id: 'l1-m2',
    level: 1,
    levelName: 'Level 1 — Starter',
    title: 'Memasukkan & Memformat Data dengan Rapi',
    description: 'Bedakan tipe data teks, angka, mata uang, dan ubah tampilannya agar profesional.',
    durationMinutes: 15,
    xpReward: 60,
    babyAnalogy: 'Teks itu seperti boneka (selalu menempel ke kiri), sedangkan angka itu seperti koin berat (selalu meluncur dan menempel ke kanan).',
    objectives: [
      'Mengenal perbedaan format Teks vs Angka.',
      'Menerapkan perataan teks (kiri, tengah, kanan).',
      'Mengatur format desimal dan pemisah ribuan.'
    ],
    simpleExplanation: 'Excel otomatis membedakan teks (rapat kiri) dan angka murni (rapat kanan). Jika kamu mengetik "100rb" dengan huruf, Excel menganggapnya teks dan tidak bisa dijumlahkan! Pastikan angka ditulis murni "100000".',
    exampleData: {
      headers: ['Barang', 'Qty', 'Harga Satuan'],
      rows: [
        ['Buku Tulis', 5, 4500],
        ['Pensil 2B', 10, 2000],
        ['Penghapus', 3, 1500]
      ],
      formulaDemo: 'Format Harga jadi 4.500',
      resultDemo: 'Angka tetap murni, hanya tampilan lebih rapi'
    },
    exercise: {
      instruction: 'Di sel C4, masukkan harga total untuk 5 pcs Binder seharga 15000 per pcs dengan mengetik angka murni 75000 (tanpa titik atau tulisan Rp).',
      targetCell: 'C4',
      expectedFormulaPattern: /^75000$/,
      expectedValue: 75000,
      initialData: {
        A1: 'Barang', B1: 'Qty', C1: 'Harga Total',
        A2: 'Buku', B2: '5', C2: '25000',
        A3: 'Pena', B3: '4', C3: '16000',
        A4: 'Binder', B4: '5', C4: ''
      },
      hints: [
        'Klik sel C4 di bawah 16000.',
        'Ketik 75000 lalu tekan Enter.',
        'Jangan masukkan huruf "Rp" atau titik manual di sel angka agar kalkulasi tidak rusak.'
      ],
      solutionExplanation: 'Dengan mengetik angka 75000 secara murni, Excel mengenali data sebagai tipe numerik yang siap diproses rumus perkalian atau penjumlahan.'
    },
    completionCriteria: [
      'Dapat membedakan data teks dan angka pada sel.',
      'Memahami pentingnya menulis angka tanpa simbol karakter manual.',
      'Data tersusun terstruktur dalam tabel baris dan kolom.'
    ]
  },
  {
    id: 'l1-m3',
    level: 1,
    levelName: 'Level 1 — Starter',
    title: 'Operasi Matematika Dasar & Referensi Sel',
    description: 'Gunakan tanda sama dengan (=) untuk perkalian, pembagian, tambah, dan kurang.',
    durationMinutes: 15,
    xpReward: 75,
    babyAnalogy: 'Tanda sama dengan (=) adalah kata sandi ajaib "Simsalabim!". Begitu diucapkan di awal sel, kotak tersebut langsung berubah menjadi kalkulator pintar.',
    objectives: [
      'Menulis rumus matematika menggunakan +, -, *, /, dan ^.',
      'Memakai referensi sel (misal =A1*B1) dibanding angka paten (hardcode).',
      'Memahami keunggulan otomatisasi saat data sumber diperbarui.'
    ],
    simpleExplanation: 'Untuk menyuruh Excel berhitung, selalu awali dengan tanda sama dengan (=). Jangan ketik "=5*10000", melainkan ketik "=B2*C2". Jika jumlah barang berubah, total harga di B2*C2 akan otomatis berubah sendiri!',
    exampleData: {
      headers: ['Produk', 'Jumlah (B)', 'Harga (C)', 'Subtotal (=B*C)'],
      rows: [
        ['Donat Cokelat', 4, 8000, '=B2*C2 (32.000)'],
        ['Croissant', 2, 18000, '=B3*C3 (36.000)']
      ],
      formulaDemo: '=B2*C2',
      resultDemo: '32000'
    },
    exercise: {
      instruction: 'Hitung Subtotal barang di sel D2 dengan mengalikan sel B2 (Jumlah) dengan sel C2 (Harga). Ketik rumus =B2*C2 di sel D2.',
      targetCell: 'D2',
      expectedFormulaPattern: /^=B2\*C2$/i,
      expectedValue: 32000,
      initialData: {
        A1: 'Barang', B1: 'Jumlah', C1: 'Harga', D1: 'Subtotal',
        A2: 'Donat Cokelat', B2: '4', C2: '8000', D2: '',
        A3: 'Croissant', B3: '2', C3: '18000', D3: '=B3*C3'
      },
      hints: [
        'Klik sel D2.',
        'Awali dengan tanda sama dengan (=).',
        'Ketik B2*C2 lalu tekan Enter.'
      ],
      solutionExplanation: 'Rumus =B2*C2 mereferensikan sel B2 (4) dan C2 (8000). Hasilnya 32000. Jika angka di B2 kamu ganti jadi 10, nilai D2 akan otomatis melonjak jadi 80000!'
    },
    completionCriteria: [
      'Mampu membuat rumus operasi perkalian menggunakan simbol asteris (*).',
      'Menggunakan referensi sel dinamis.',
      'Memahami efek reaktif ketika data sumber diubah.'
    ]
  },
  {
    id: 'l1-m4',
    level: 1,
    levelName: 'Level 1 — Starter',
    title: '5 Rumus Super: SUM, AVERAGE, MIN, MAX & COUNT',
    description: 'Kuasai lima fungsi statistik wajib yang paling sering dipakai di seluruh dunia kerja.',
    durationMinutes: 20,
    xpReward: 80,
    babyAnalogy: 'SUM itu kantong ajaib pengumpul koin, AVERAGE itu pembagi rata kue, MIN pencari yang paling mungil, MAX pencari sang raksasa, dan COUNT penghitung kepala.',
    objectives: [
      'Menjumlahkan rentang dengan =SUM(A1:A10).',
      'Menghitung rata-rata nilai dengan =AVERAGE(...).',
      'Menemukan nilai tertinggi (MAX) dan terendah (MIN).',
      'Menghitung banyak baris angka dengan COUNT.'
    ],
    simpleExplanation: 'Daripada menulis =A1+A2+A3+A4+A5 yang melelahkan, gunakan =SUM(A1:A5). Begitu pula dengan rata-rata, cukup =AVERAGE(A1:A5). Tanda titik dua (:) artinya "sampai dengan".',
    exampleData: {
      headers: ['Siswa', 'Nilai Ujian'],
      rows: [
        ['Ahmad', 85],
        ['Bunga', 95],
        ['Cahyo', 70],
        ['Dian', 90]
      ],
      formulaDemo: '=SUM(B2:B5) & =AVERAGE(B2:B5)',
      resultDemo: 'Total 340, Rata-rata 85'
    },
    exercise: {
      instruction: 'Hitung total seluruh nilai ujian di sel B6 menggunakan rumus =SUM(B2:B5).',
      targetCell: 'B6',
      expectedFormulaPattern: /^=SUM\(B2:B5\)$/i,
      expectedValue: 340,
      initialData: {
        A1: 'Nama Siswa', B1: 'Nilai Ujian',
        A2: 'Ahmad', B2: '85',
        A3: 'Bunga', B3: '95',
        A4: 'Cahyo', B4: '70',
        A5: 'Dian', B5: '90',
        A6: 'Total Nilai', B6: ''
      },
      hints: [
        'Klik sel B6 di samping tulisan "Total Nilai".',
        'Ketik =SUM(B2:B5)',
        'Tekan Enter untuk melihat hasil penjumlahan 340.'
      ],
      solutionExplanation: 'Fungsi SUM merangkul seluruh sel dari B2 sampai B5 dan menjumlahkannya (85 + 95 + 70 + 90 = 340).'
    },
    completionCriteria: [
      'Mengetahui sintaks penulisan rentang sel dengan titik dua (:).',
      'Berhasil mengimplementasikan fungsi SUM.',
      'Memahami fungsi statistik dasar untuk analisis kumpulan data.'
    ]
  },
  {
    id: 'l1-m5',
    level: 1,
    levelName: 'Level 1 — Starter',
    title: 'Sort (Urutkan) & Filter (Saring Data)',
    description: 'Atur data dari A-Z atau angka terbesar, dan saring hanya baris yang kamu butuhkan.',
    durationMinutes: 15,
    xpReward: 70,
    babyAnalogy: 'Sort itu menata barisan murid dari yang paling pendek ke tinggi. Filter itu saringan jus yang membuang ampas dan cuma mengambil sarinya.',
    objectives: [
      'Mengurutkan tabel berdasarkan abjad teks atau nilai angka (Ascending/Descending).',
      'Menyaring data tanpa menghapus baris yang disembunyikan.',
      'Mencegah data teracak karena salah memblok area tabel.'
    ],
    simpleExplanation: 'Saat data berjumlah ratusan baris, Sort memudahkan kita melihat siapa penjualan tertinggi (Sort Descending Z-A / Terbesar). Filter memunculkan tombol panah di kepala tabel untuk memilih kategori tertentu saja (misal hanya cabang "Surabaya").',
    exampleData: {
      headers: ['Kota', 'Penjualan'],
      rows: [
        ['Jakarta', 15000000],
        ['Bandung', 9000000],
        ['Surabaya', 12000000]
      ],
      formulaDemo: 'Sort Descending pada Penjualan',
      resultDemo: 'Jakarta (15jt) -> Surabaya (12jt) -> Bandung (9jt)'
    },
    exercise: {
      instruction: 'Cari nilai penjualan tertinggi di sel B6 menggunakan rumus =MAX(B2:B5).',
      targetCell: 'B6',
      expectedFormulaPattern: /^=MAX\(B2:B5\)$/i,
      expectedValue: 15000000,
      initialData: {
        A1: 'Kota', B1: 'Penjualan',
        A2: 'Bandung', B2: '9000000',
        A3: 'Jakarta', B3: '15000000',
        A4: 'Semarang', B4: '6500000',
        A5: 'Surabaya', B5: '12000000',
        A6: 'Penjualan Tertinggi', B6: ''
      },
      hints: [
        'Klik sel B6 di baris Penjualan Tertinggi.',
        'Ketik =MAX(B2:B5)',
        'Tekan Enter. Nilai tertinggi adalah 15000000 (Jakarta).'
      ],
      solutionExplanation: 'Fungsi MAX memindai rentang B2:B5 dan mengembalikan angka paling tinggi di antara seluruh cabang.'
    },
    completionCriteria: [
      'Memahami konsep urutan data terbesar ke terkecil.',
      'Bisa mengekstraksi nilai ekstrem dengan rumus MAX/MIN.',
      'Mengenal alur pembersihan sebelum presentasi data.'
    ]
  },
  {
    id: 'l1-m6',
    level: 1,
    levelName: 'Level 1 — Starter',
    title: 'Latihan Terpadu Level 1 & Pembahasan',
    description: 'Uji semua keterampilan Starter kamu dalam studi kasus toko kue mini.',
    durationMinutes: 20,
    xpReward: 100,
    babyAnalogy: 'Ini saatnya membuka toko sungguhan! Kamu jadi kasir sekaligus manajer keuangan yang menghitung omset hari pertama.',
    objectives: [
      'Menggabungkan perkalian unit x harga, total SUM, dan rata-rata AVERAGE.',
      'Memeriksa integritas rumus agar tidak ada sel kosong.',
      'Menyelesaikan studi kasus mandiri pertama.'
    ],
    simpleExplanation: 'Di latihan ini, kamu punya daftar 3 jenis kue. Hitung subtotal tiap kue dengan rumus perkalian, lalu hitung total omset toko dengan SUM!',
    exampleData: {
      headers: ['Kue', 'Terjual (B)', 'Harga (C)', 'Omset (D)'],
      rows: [
        ['Cupcake Vanilla', 10, 15000, 150000],
        ['Bolu Gulung', 5, 40000, 200000],
        ['Brownies', 8, 35000, 280000]
      ],
      formulaDemo: 'Total Omset =SUM(D2:D4)',
      resultDemo: '630.000'
    },
    exercise: {
      instruction: 'Di sel D5, hitung grand total omset dari ketiga jenis kue menggunakan rumus =SUM(D2:D4).',
      targetCell: 'D5',
      expectedFormulaPattern: /^=SUM\(D2:D4\)$/i,
      expectedValue: 630000,
      initialData: {
        A1: 'Kue', B1: 'Terjual', C1: 'Harga', D1: 'Omset',
        A2: 'Cupcake Vanilla', B2: '10', C2: '15000', D2: '=B2*C2',
        A3: 'Bolu Gulung', B3: '5', C3: '40000', D3: '=B3*C3',
        A4: 'Brownies', B4: '8', C4: '35000', D4: '=B4*C4',
        A5: 'Grand Total', B5: '', C5: '', D5: ''
      },
      hints: [
        'Klik sel D5.',
        'Ketik =SUM(D2:D4)',
        'Tekan Enter. Pastikan hasilnya 630000.'
      ],
      solutionExplanation: 'Grand total 630000 didapatkan dari 150000 (Cupcake) + 200000 (Bolu) + 280000 (Brownies). Selamat, kamu menuntaskan Level 1!'
    },
    completionCriteria: [
      'Menguasai perkalian dan formula SUM rentang sel.',
      'Mampu menyelesaikan studi kasus toko mini secara tuntas.',
      'Siap melangkah ke Level 2 — Formula Explorer!'
    ]
  },

  // LEVEL 2: FORMULA EXPLORER
  {
    id: 'l2-m1',
    level: 2,
    levelName: 'Level 2 — Formula Explorer',
    title: 'Fungsi Logika IF: Bikin Excel Bisa Berpikir',
    description: 'Berikan kecerdasan pada tabelmu dengan aturan "Jika syarat terpenuhi, lakukan X, jika tidak lakukan Y".',
    durationMinutes: 20,
    xpReward: 90,
    babyAnalogy: 'Satpam taman bermain: "Kalau tinggi badanmu minimal 120 cm, silakan naik roller coaster. Kalau belum, main komedi putar dulu ya".',
    objectives: [
      'Memahami 3 bagian rumus IF: Tes Logika, Nilai Jika Benar, Nilai Jika Salah.',
      'Menggunakan operator pembanding: >, <, >=, <=, =, <>.',
      'Menulis teks di dalam rumus dengan tanda petik dua ("...").'
    ],
    simpleExplanation: 'Rumus IF ditulis: =IF(kondisi, jika_benar, jika_salah). Contoh: =IF(B2>=75, "LULUS", "REMIDIAL"). Jika angka di B2 adalah 80, maka hasilnya "LULUS". Jika angka di B2 adalah 60, hasilnya "REMIDIAL".',
    exampleData: {
      headers: ['Siswa', 'Nilai (B)', 'Status (=IF(B2>=75, "Lulus", "Remidi"))'],
      rows: [
        ['Rina', 88, 'Lulus'],
        ['Fajar', 65, 'Remidi'],
        ['Gita', 75, 'Lulus']
      ],
      formulaDemo: '=IF(B2>=75, "Lulus", "Remidi")',
      resultDemo: 'Lulus'
    },
    exercise: {
      instruction: 'Tentukan status kelulusan siswa pertama di sel C2. Jika nilai B2 lebih besar atau sama dengan 75 maka "Lulus", selain itu "Remidi". Ketik: =IF(B2>=75, "Lulus", "Remidi")',
      targetCell: 'C2',
      expectedFormulaPattern: /^=IF\(B2>=75,\s*"Lulus",\s*"Remidi"\)$/i,
      expectedValue: 'Lulus',
      initialData: {
        A1: 'Nama', B1: 'Nilai', C1: 'Status',
        A2: 'Rina', B2: '88', C2: '',
        A3: 'Fajar', B3: '65', C3: '=IF(B3>=75, "Lulus", "Remidi")'
      },
      hints: [
        'Klik sel C2.',
        'Ketik persis: =IF(B2>=75, "Lulus", "Remidi")',
        'Pastikan ada tanda petik dua di kata "Lulus" dan "Remidi".'
      ],
      solutionExplanation: 'Karena sel B2 bernilai 88 (yang mana >= 75 adalah BENAR), maka rumus IF langsung memilih kata pertama: "Lulus".'
    },
    completionCriteria: [
      'Memahami struktur parameter fungsi IF.',
      'Bisa menentukan kondisi numerik dengan operator pembanding.',
      'Mencegah syntax error lupa tanda petik pada teks.'
    ]
  },
  {
    id: 'l2-m2',
    level: 2,
    levelName: 'Level 2 — Formula Explorer',
    title: 'Penjumlahan Bersyarat: SUMIF & COUNTIF',
    description: 'Jumlahkan nominal dan hitung jumlah transaksi hanya untuk kategori yang kamu tentukan.',
    durationMinutes: 25,
    xpReward: 95,
    babyAnalogy: 'SUMIF itu detektif yang hanya menjumlahkan koper berlabel "Jakarta". COUNTIF itu penghitung berapa banyak koper berlabel "Jakarta" tersebut.',
    objectives: [
      'Menjumlahkan angka dengan 1 kriteria memakai SUMIF.',
      'Menghitung frekuensi kemunculan data dengan COUNTIF.',
      'Membedakan rentang kriteria dan rentang penjumlahan.'
    ],
    simpleExplanation: 'SUMIF berguna saat kamu punya tabel ribuan transaksi dan bos bertanya: "Berapa total penjualan khusus produk Kopi?". Rumusnya: =SUMIF(rentang_kategori, "Kopi", rentang_omset).',
    exampleData: {
      headers: ['Kategori', 'Omset'],
      rows: [
        ['Kopi', 50000],
        ['Snack', 20000],
        ['Kopi', 75000],
        ['Teh', 15000]
      ],
      formulaDemo: '=SUMIF(A2:A5, "Kopi", B2:B5)',
      resultDemo: '125000'
    },
    exercise: {
      instruction: 'Hitung total omset khusus produk "Kopi" di sel E2 menggunakan rumus =SUMIF(A2:A5, "Kopi", B2:B5).',
      targetCell: 'E2',
      expectedFormulaPattern: /^=SUMIF\(A2:A5,\s*"Kopi",\s*B2:B5\)$/i,
      expectedValue: 125000,
      initialData: {
        A1: 'Kategori', B1: 'Omset', C1: '', D1: 'Filter', E1: 'Total Kopi',
        A2: 'Kopi', B2: '50000', C2: '', D2: 'Kopi', E2: '',
        A3: 'Snack', B3: '20000', C3: '', D3: '', E3: '',
        A4: 'Kopi', B4: '75000', C4: '', D4: '', E4: '',
        A5: 'Teh', B5: '15000', C5: '', D5: '', E5: ''
      },
      hints: [
        'Klik sel E2.',
        'Ketik =SUMIF(A2:A5, "Kopi", B2:B5)',
        'Tekan Enter. Nilai 50000 + 75000 = 125000.'
      ],
      solutionExplanation: 'SUMIF memeriksa kolom A2:A5. Hanya baris 2 dan 4 yang cocok dengan kata "Kopi", sehingga Excel hanya menjumlahkan 50000 + 75000 = 125000.'
    },
    completionCriteria: [
      'Memahami perbedaan kriteria teks vs rentang angka.',
      'Bisa menuliskan SUMIF dengan benar.',
      'Mampu menghitung rekap data per kategori tanpa filter manual.'
    ]
  },
  {
    id: 'l2-m3',
    level: 2,
    levelName: 'Level 2 — Formula Explorer',
    title: 'Manipulasi Teks & Tanggal: CONCAT, LEFT, RIGHT, TODAY',
    description: 'Potong kode produk, rapikan nama depan & belakang, serta gunakan tanggal dinamis.',
    durationMinutes: 20,
    xpReward: 90,
    babyAnalogy: 'CONCAT itu lem kertas yang merekatkan dua lembar foto jadi satu. LEFT dan RIGHT itu gunting yang memotong beberapa huruf dari sisi kiri atau kanan.',
    objectives: [
      'Menggabungkan teks dengan CONCAT atau simbol &.',
      'Mengambil potongan kode dengan LEFT, RIGHT, dan MID.',
      'Menggunakan fungsi tanggal otomatis =TODAY().'
    ],
    simpleExplanation: 'Seringkali data nama terpisah: Kolom A "Budi", Kolom B "Santoso". Untuk menjadikannya "Budi Santoso", ketik =CONCAT(A2, " ", B2) atau =A2 & " " & B2. Untuk mengambil 3 huruf pertama kode produk "IDN-99", ketik =LEFT(A2, 3).',
    exampleData: {
      headers: ['Nama Depan', 'Nama Belakang', 'Nama Lengkap (=A2 & " " & B2)'],
      rows: [
        ['Budi', 'Santoso', 'Budi Santoso'],
        ['Citra', 'Lestari', 'Citra Lestari']
      ],
      formulaDemo: '=A2 & " " & B2',
      resultDemo: 'Budi Santoso'
    },
    exercise: {
      instruction: 'Gabungkan Nama Depan di A2 dan Nama Belakang di B2 dengan spasi di tengahnya di sel C2. Ketik: =A2 & " " & B2',
      targetCell: 'C2',
      expectedFormulaPattern: /^=A2\s*&\s*" "\s*&\s*B2$/i,
      expectedValue: 'Budi Santoso',
      initialData: {
        A1: 'Nama Depan', B1: 'Nama Belakang', C1: 'Nama Lengkap',
        A2: 'Budi', B2: 'Santoso', C2: '',
        A3: 'Citra', B3: 'Lestari', C3: '=A3 & " " & B3'
      },
      hints: [
        'Klik sel C2.',
        'Ketik: =A2 & " " & B2',
        'Tanda " " (petik dua dengan spasi) sangat penting agar kedua kata tidak dempet!'
      ],
      solutionExplanation: 'Operator & menghubungkan sel A2 ("Budi"), spasi (" "), dan sel B2 ("Santoso") menjadi satu kesatuan teks rapi "Budi Santoso".'
    },
    completionCriteria: [
      'Bisa menggabungkan teks dengan spasi pemisah.',
      'Memahami fungsi pemotongan string.',
      'Bisa memanfaatkan fungsi tanggal otomatis.'
    ]
  },
  {
    id: 'l2-m4',
    level: 2,
    levelName: 'Level 2 — Formula Explorer',
    title: 'The King of Lookup: VLOOKUP & XLOOKUP',
    description: 'Cari data secara instan dari tabel referensi berdasarkan kode ID barang atau pelanggan.',
    durationMinutes: 25,
    xpReward: 110,
    babyAnalogy: 'VLOOKUP itu pelayan kafe yang melihat nomor meja di bon, lalu berlari ke buku catatan untuk membacakan pesanan meja tersebut.',
    objectives: [
      'Mengenal 4 parameter VLOOKUP (Nilai Cari, Tabel, Nomor Kolom, FALSE).',
      'Memahami keunggulan XLOOKUP modern (tidak perlu hitung kolom manual, bisa cari ke kiri).',
      'Mengatasi error #N/A jika kode tidak ditemukan.'
    ],
    simpleExplanation: 'VLOOKUP mencari nilai di kolom 1 tabel, lalu mengambil data di kolom ke-N baris yang sama. Contoh: =VLOOKUP("BRG02", A2:C5, 2, FALSE) akan mencari "BRG02" dan mengambil nama barang di kolom kedua.',
    exampleData: {
      headers: ['Kode', 'Nama Barang', 'Harga'],
      rows: [
        ['BRG01', 'Kopi Susu', 18000],
        ['BRG02', 'Matcha Latte', 24000],
        ['BRG03', 'Earl Grey', 20000]
      ],
      formulaDemo: '=VLOOKUP("BRG02", A2:C4, 2, FALSE)',
      resultDemo: 'Matcha Latte'
    },
    exercise: {
      instruction: 'Di sel F2, ambil Harga barang untuk Kode di E2 ("BRG02") dari tabel A2:C4. Kolom Harga adalah kolom ke-3. Ketik: =VLOOKUP(E2, A2:C4, 3, FALSE)',
      targetCell: 'F2',
      expectedFormulaPattern: /^=VLOOKUP\(E2,\s*A2:C4,\s*3,\s*FALSE\)$/i,
      expectedValue: 24000,
      initialData: {
        A1: 'Kode', B1: 'Nama Barang', C1: 'Harga', D1: '', E1: 'Cari Kode', F1: 'Hasil Harga',
        A2: 'BRG01', B2: 'Kopi Susu', C2: '18000', D2: '', E2: 'BRG02', F2: '',
        A3: 'BRG02', B3: 'Matcha Latte', C3: '24000', D3: '', E3: '', F3: '',
        A4: 'BRG03', B4: 'Earl Grey', C4: '20000', D4: '', E4: '', F4: ''
      },
      hints: [
        'Klik sel F2.',
        'Ketik: =VLOOKUP(E2, A2:C4, 3, FALSE)',
        'Angka 3 adalah letak kolom Harga di dalam tabel A2:C4.'
      ],
      solutionExplanation: 'Excel mencari "BRG02" di kolom Kode (A), mencocokkannya di baris ke-3, lalu mengambil isi kolom ke-3 (Harga), yaitu 24000!'
    },
    completionCriteria: [
      'Memahami mekanisme pencarian vertikal tabel.',
      'Mampu menentukan index kolom yang tepat.',
      'Mengetahui peran parameter FALSE untuk pencarian eksak.'
    ]
  },
  {
    id: 'l2-m5',
    level: 2,
    levelName: 'Level 2 — Formula Explorer',
    title: 'Penjinak Error: IFERROR & Pembersihan Data',
    description: 'Sembunyikan pesan seram seperti #DIV/0! dan #N/A agar tabelmu tetap bersih dan profesional.',
    durationMinutes: 15,
    xpReward: 85,
    babyAnalogy: 'IFERROR itu jaring pengaman sirkus: kalau akrobat terjatuh, jaring akan menangkapnya dengan selamat tanpa rasa sakit.',
    objectives: [
      'Membungkus rumus riskan dengan =IFERROR(rumus, "pesan ramah").',
      'Mencegah tampilan rumus rusak saat ada pembagi nol atau data belum diisi.',
      'Meningkatkan estetika laporan kerja.'
    ],
    simpleExplanation: 'Ketika membagi angka dengan nol (misal 100/0), Excel memunculkan #DIV/0!. Bungkus rumusmu dengan IFERROR: =IFERROR(A1/B1, 0) atau =IFERROR(VLOOKUP(...), "Data Belum Ada").',
    exampleData: {
      headers: ['Omset (A)', 'Target (B)', 'Pencapaian'],
      rows: [
        [5000000, 10000000, '50%'],
        [2000000, 0, '=IFERROR(A3/B3, 0) -> 0']
      ],
      formulaDemo: '=IFERROR(A2/B2, 0)',
      resultDemo: 'Aman tanpa #DIV/0!'
    },
    exercise: {
      instruction: 'Di sel C2, bagi Omset (A2) dengan Target (B2) tetapi bungkus dengan IFERROR agar jika ada error menghasilkan 0. Ketik: =IFERROR(A2/B2, 0)',
      targetCell: 'C2',
      expectedFormulaPattern: /^=IFERROR\(A2\/B2,\s*0\)$/i,
      expectedValue: 0.5,
      initialData: {
        A1: 'Omset', B1: 'Target', C1: 'Persentase',
        A2: '5000000', B2: '10000000', C2: '',
        A3: '2000000', B3: '0', C3: '=IFERROR(A3/B3, 0)'
      },
      hints: [
        'Klik sel C2.',
        'Ketik: =IFERROR(A2/B2, 0)',
        'Sel A3/B3 membagi angka dengan 0, tetapi karena memakai IFERROR ia menampilkan 0 bukan #DIV/0!.'
      ],
      solutionExplanation: 'Karena A2/B2 berhasil dihitung (0.5), IFERROR menampilkan hasil normal. Bila pembagi di B2 nanti berubah jadi 0, sel otomatis aman bernilai 0.'
    },
    completionCriteria: [
      'Mengetahui sintaks pelindung rumus IFERROR.',
      'Memahami penyebab error pembagian nol dan lookup kosong.',
      'Mampu membuat spreadsheet tahan uji dari input pengguna yang keliru.'
    ]
  },
  {
    id: 'l2-m6',
    level: 2,
    levelName: 'Level 2 — Formula Explorer',
    title: 'Studi Kasus Multi-Langkah: Invoice Kasir Otomatis',
    description: 'Gabungkan VLOOKUP, Perkalian, IF Diskon, dan IFERROR dalam satu sistem nota kasir nyata.',
    durationMinutes: 30,
    xpReward: 120,
    babyAnalogy: 'Kamu merakit mesin kasir canggih: ketik kode barang, nama dan harganya muncul otomatis, lalu diskon terhitung sendiri!',
    objectives: [
      'Menghubungkan tabel referensi harga dengan lembar transaksi.',
      'Menghitung diskon 10% jika pembelian di atas 100.000 menggunakan IF.',
      'Menghitung total bayar akhir yang akurat.'
    ],
    simpleExplanation: 'Sistem nota modern menggunakan lookup otomatis. Kasir hanya mengetik kode produk dan jumlah, sedangkan nama barang, harga satuan, subtotal, dan diskon dihitung otomatis oleh Excel.',
    exampleData: {
      headers: ['Kode', 'Barang', 'Jumlah', 'Harga', 'Subtotal'],
      rows: [
        ['BRG1', 'Mouse Wireless', 3, 75000, 225000],
        ['BRG2', 'Keyboard RGB', 1, 150000, 150000]
      ],
      formulaDemo: 'Total =SUM(E2:E3)',
      resultDemo: '375000'
    },
    exercise: {
      instruction: 'Di sel E2, hitung Subtotal dengan mengalikan sel C2 (Jumlah) dengan sel D2 (Harga). Ketik: =C2*D2',
      targetCell: 'E2',
      expectedFormulaPattern: /^=C2\*D2$/i,
      expectedValue: 225000,
      initialData: {
        A1: 'Kode', B1: 'Nama Barang', C1: 'Jumlah', D1: 'Harga', E1: 'Subtotal',
        A2: 'BRG1', B2: 'Mouse Wireless', C2: '3', D2: '75000', E2: '',
        A3: 'BRG2', B3: 'Keyboard RGB', C3: '1', D3: '150000', E3: '=C3*D3',
        A4: 'Total Belanja', B4: '', C4: '', D4: '', E4: '=SUM(E2:E3)'
      },
      hints: [
        'Klik sel E2.',
        'Ketik: =C2*D2',
        'Tekan Enter. Subtotal 3 x 75000 = 225000, dan Grand Total di E4 otomatis jadi 375000!'
      ],
      solutionExplanation: 'Luar biasa! Seluruh rantai kalkulasi bekerja sempurna: C2 dikalikan D2 menghasilkan 225000, lalu di E4 fungsi SUM menjumlahkannya menjadi total belanja 375000.'
    },
    completionCriteria: [
      'Menuntaskan seluruh modul Level 2.',
      'Mengintegrasikan operasi aritmatika dan referensi multi-sel.',
      'Siap naik kelas ke Level 3 — Data Hero!'
    ]
  },

  // LEVEL 3: DATA HERO
  {
    id: 'l3-m1',
    level: 3,
    levelName: 'Level 3 — Data Hero',
    title: 'PivotTable & PivotChart: Sulap Ribuan Data dalam 3 Detik',
    description: 'Rangkum laporan penjualan puluhan cabang tanpa menulis satu pun rumus manual.',
    durationMinutes: 25,
    xpReward: 120,
    babyAnalogy: 'Penyortir koin otomatis bank: tuang seember koin campur aduk, mesin langsung mengelompokkan per nominal dan menghitung totalnya rapi.',
    objectives: [
      'Memahami 4 kuadran PivotTable: Filters, Columns, Rows, Values.',
      'Mengubah agregasi dari SUM ke COUNT atau AVERAGE di Values.',
      'Menghubungkan PivotChart untuk visualisasi grafik instan.'
    ],
    simpleExplanation: 'PivotTable adalah fitur andalan analis data. Cukup seret kolom "Kota" ke Rows dan "Penjualan" ke Values, Excel langsung membuat tabel rekap total omset per kota tanpa perlu menulis rumus SUMIF berulang-ulang.',
    exampleData: {
      headers: ['Wilayah (Rows)', 'Total Omset (Values SUM)'],
      rows: [
        ['Jakarta', 145000000],
        ['Surabaya', 98000000],
        ['Medan', 62000000]
      ],
      formulaDemo: 'Drag & Drop bidang Pivot',
      resultDemo: 'Tabel Rekap Instan + Grafik'
    },
    exercise: {
      instruction: 'Di sel B5, hitung grand total rekap penjualan wilayah menggunakan rumus =SUM(B2:B4).',
      targetCell: 'B5',
      expectedFormulaPattern: /^=SUM\(B2:B4\)$/i,
      expectedValue: 305000000,
      initialData: {
        A1: 'Wilayah', B1: 'Total Omset',
        A2: 'Jakarta', B2: '145000000',
        A3: 'Surabaya', B3: '98000000',
        A4: 'Medan', B4: '62000000',
        A5: 'Total Nasional', B5: ''
      },
      hints: [
        'Klik sel B5 di baris Total Nasional.',
        'Ketik: =SUM(B2:B4)',
        'Tekan Enter. Grand total adalah 305.000.000.'
      ],
      solutionExplanation: 'Rekap wilayah ini merepresentasikan output PivotTable sederhana: total gabungan ketiga kota mencapai 305 juta rupiah.'
    },
    completionCriteria: [
      'Paham logika pemetaan baris dan kolom pada analisis data.',
      'Mengenal efisiensi PivotTable dibanding formula manual.',
      'Siap membuat laporan manajemen eksekutif.'
    ]
  },
  {
    id: 'l3-m2',
    level: 3,
    levelName: 'Level 3 — Data Hero',
    title: 'Conditional Formatting: Beri Warna Otomatis pada Data Penting',
    description: 'Sorot angka di bawah target dengan warna merah dan angka prestasi dengan warna hijau secara otomatis.',
    durationMinutes: 20,
    xpReward: 100,
    babyAnalogy: 'Lampu lalu lintas otomatis: merah untuk berhenti/bahaya, hijau untuk jalan/bagus, kuning untuk waspada.',
    objectives: [
      'Menerapkan aturan Highlight Cells (Greater Than, Less Than, Equal To).',
      'Menggunakan Color Scales dan Data Bars untuk grafik mikro di dalam sel.',
      'Menulis aturan kustom berbasis rumus.'
    ],
    simpleExplanation: 'Dengan Conditional Formatting, warna sel akan berubah dinamis sesuai isinya. Misalnya nilai ujian < 75 otomatis berlatar pink/merah, sedangkan >= 75 berlatar hijau/biru. Kamu tak perlu mewarnai sel satu per satu secara manual!',
    exampleData: {
      headers: ['Sales Person', 'Target', 'Realisasi', 'Keterangan'],
      rows: [
        ['Andi', 50, 65, 'Tercapai (Hijau)'],
        ['Bella', 50, 42, 'Kurang (Merah)']
      ],
      formulaDemo: 'Rule: Value >= 50 Green, Value < 50 Red',
      resultDemo: 'Tampilan visual interaktif'
    },
    exercise: {
      instruction: 'Gunakan IF di sel C2 untuk menandai apakah skor 85 sudah memenuhi batas KKM (75) dengan teks "HIJAU" jika >= 75 dan "MERAH" jika kurang. Ketik: =IF(B2>=75, "HIJAU", "MERAH")',
      targetCell: 'C2',
      expectedFormulaPattern: /^=IF\(B2>=75,\s*"HIJAU",\s*"MERAH"\)$/i,
      expectedValue: 'HIJAU',
      initialData: {
        A1: 'Nama', B1: 'Skor', C1: 'Indikator Warna',
        A2: 'Andi', B2: '85', C2: '',
        A3: 'Bella', B3: '60', C3: '=IF(B3>=75, "HIJAU", "MERAH")'
      },
      hints: [
        'Klik sel C2.',
        'Ketik: =IF(B2>=75, "HIJAU", "MERAH")',
        'Tekan Enter. Andi berhak mendapat predikat HIJAU.'
      ],
      solutionExplanation: 'Logika ini mendasari Conditional Formatting: sistem mengevaluasi kondisi sel untuk memicu perubahan visual.'
    },
    completionCriteria: [
      'Memahami logika pemicu warna bersyarat.',
      'Mampu menentukan threshold batas nilai.',
      'Menghasilkan tabel data yang ramah mata pembaca.'
    ]
  },
  {
    id: 'l3-m3',
    level: 3,
    levelName: 'Level 3 — Data Hero',
    title: 'Data Validation: Cegah Kesalahan Ketik dengan Dropdown List',
    description: 'Batasi input pengguna hanya pada pilihan menu tertentu atau rentang angka valid.',
    durationMinutes: 15,
    xpReward: 95,
    babyAnalogy: 'Pintu gerbang berbentuk segitiga: cuma balok segitiga yang boleh lewat, balok lingkaran atau kotak ditolak.',
    objectives: [
      'Membuat Dropdown Menu (List) pada sel.',
      'Membatasi angka tanggal atau nilai minimum/maksimum.',
      'Menampilkan pesan error kustom yang mendidik pengguna.'
    ],
    simpleExplanation: 'Seringkali orang mengetik "JKT", "Jakarta", "dki jakarta" yang membuat data berantakan. Dengan Data Validation > List: "Jakarta, Bandung, Surabaya", pengguna tinggal memilih dari dropdown dan terbebas dari salah ketik!',
    exampleData: {
      headers: ['ID Transaksi', 'Kategori (Dropdown)', 'Status Pembayaran'],
      rows: [
        ['TRX-001', 'Elektronik', 'Lunas'],
        ['TRX-002', 'Fashion', 'Pending']
      ],
      formulaDemo: 'Validation List: "Lunas, Pending, Batal"',
      resultDemo: 'Dropdown panah kecil di sel'
    },
    exercise: {
      instruction: 'Hitung berapa banyak transaksi yang berstatus "Lunas" di sel B5 menggunakan rumus: =COUNTIF(B2:B4, "Lunas")',
      targetCell: 'B5',
      expectedFormulaPattern: /^=COUNTIF\(B2:B4,\s*"Lunas"\)$/i,
      expectedValue: 2,
      initialData: {
        A1: 'ID', B1: 'Status',
        A2: 'TRX-1', B2: 'Lunas',
        A3: 'TRX-2', B3: 'Pending',
        A4: 'TRX-3', B4: 'Lunas',
        A5: 'Total Lunas', B5: ''
      },
      hints: [
        'Klik sel B5.',
        'Ketik: =COUNTIF(B2:B4, "Lunas")',
        'Tekan Enter. Ada 2 baris yang lunas.'
      ],
      solutionExplanation: 'Ketika data tervalidasi seragam ("Lunas"), fungsi analisis seperti COUNTIF dapat bekerja dengan akurasi 100% tanpa risiko typo.'
    },
    completionCriteria: [
      'Mengenal fungsi dropdown dan validasi input.',
      'Memahami pentingnya konsistensi data untuk analitik.',
      'Mengurangi beban perbaikan data error di kemudian hari.'
    ]
  },
  {
    id: 'l3-m4',
    level: 3,
    levelName: 'Level 3 — Data Hero',
    title: 'Dashboard & Visualisasi: Ubah Angka Menjadi Cerita',
    description: 'Rancang KPI Card, Bar Chart, dan mini dashboard eksekutif yang memukau.',
    durationMinutes: 25,
    xpReward: 115,
    babyAnalogy: 'Kokpit pesawat terbang: pilot tidak perlu membaca jutaan baris kode mesin, cukup melirik speedometer dan altimeter.',
    objectives: [
      'Merancang KPI Card (Total Omset, Pertumbuhan %, Jumlah Transaksi).',
      'Memilih jenis grafik yang tepat (Bar Chart untuk perbandingan, Line Chart untuk tren waktu).',
      'Menjaga kebersihan dan tata letak ruang dashboard.'
    ],
    simpleExplanation: 'Dashboard adalah lembar rangkuman eksekutif. Atasan biasanya tidak membaca tabel detail 500 baris, melainkan langsung melihat 3 kartu angka besar (KPI) dan 1 grafik tren penjualan tahun berjalan.',
    exampleData: {
      headers: ['KPI Metric', 'Nilai Saat Ini', 'Status'],
      rows: [
        ['Total Omset', 'Rp 450.000.000', 'Naik 12%'],
        ['Pelanggan Baru', '1.240 Member', 'Target Tercapai'],
        ['Rating Kepuasan', '4.8 / 5.0', 'Sangat Baik']
      ],
      formulaDemo: 'KPI Card =SUM(Sales)',
      resultDemo: 'Tampilan Clean & Minimalis'
    },
    exercise: {
      instruction: 'Di sel B4, hitung rata-rata omset bulanan untuk ditampilkan pada KPI Card menggunakan rumus =AVERAGE(B2:B3).',
      targetCell: 'B4',
      expectedFormulaPattern: /^=AVERAGE\(B2:B3\)$/i,
      expectedValue: 125000000,
      initialData: {
        A1: 'Bulan', B1: 'Omset',
        A2: 'Januari', B2: '100000000',
        A3: 'Februari', B3: '150000000',
        A4: 'Rata-rata Bulanan (KPI)', B4: ''
      },
      hints: [
        'Klik sel B4.',
        'Ketik: =AVERAGE(B2:B3)',
        'Tekan Enter. Rata-rata adalah 125.000.000.'
      ],
      solutionExplanation: 'KPI Card ini menyajikan intisari performa finansial dua bulan pertama dengan ringkas dan siap ditampilkan ke manajemen.'
    },
    completionCriteria: [
      'Memahami prinsip hierarki visual dashboard.',
      'Bisa merumuskan metrik agregasi KPI.',
      'Mampu menyajikan data yang mudah dipahami dalam 5 detik.'
    ]
  },
  {
    id: 'l3-m5',
    level: 3,
    levelName: 'Level 3 — Data Hero',
    title: 'Analisis Data & Otomatisasi Dasar',
    description: 'Pahami logika nested formula, referensi absolut ($A$1), dan rumus dinamis.',
    durationMinutes: 25,
    xpReward: 120,
    babyAnalogy: 'Tanda dollar ($) di $A$1 itu seperti paku dinding: sel tersebut dipaku mati sehingga saat rumus dicopy ke bawah, alamatnya tidak ikut bergeser.',
    objectives: [
      'Memahami fungsi tanda dollar ($) pada Absolute Reference ($A$1).',
      'Menghindari rumus meleset saat di-drag autofill.',
      'Mengkombinasikan beberapa fungsi dalam satu rumus bertingkat (Nested IF).'
    ],
    simpleExplanation: 'Bila kamu ingin mengalikan semua baris dengan sel PPN 11% di E1, gunakan $E$1. Jika tanpa tanda $, saat rumus ditarik ke baris berikutnya akan bergeser menjadi E2, E3 yang kosong! Tekan F4 untuk mengubah A1 menjadi $A$1.',
    exampleData: {
      headers: ['Barang', 'Harga Asli', 'PPN (=$E$1) 11%', 'Total Bayar'],
      rows: [
        ['Meja Kerja', 1000000, 110000, 1110000],
        ['Kursi Ergonomis', 800000, 88000, 888000]
      ],
      formulaDemo: '=B2*$E$1',
      resultDemo: 'Akurat saat dicopy ke bawah'
    },
    exercise: {
      instruction: 'Hitung PPN untuk Meja Kerja di sel C2 dengan mengalikan Harga Asli di B2 dengan tarif PPN tetap di $E$1. Ketik: =B2*$E$1',
      targetCell: 'C2',
      expectedFormulaPattern: /^=B2\*\$E\$1$/i,
      expectedValue: 110000,
      initialData: {
        A1: 'Barang', B1: 'Harga Asli', C1: 'PPN 11%', D1: '', E1: '0.11',
        A2: 'Meja Kerja', B2: '1000000', C2: '', D2: '', E2: 'Tarif PPN',
        A3: 'Kursi', B3: '800000', C3: '=B3*$E$1', D3: '', E3: ''
      },
      hints: [
        'Klik sel C2.',
        'Ketik: =B2*$E$1',
        'Tanda $ di depan E dan 1 memastikan tarif PPN terkunci di sel E1.'
      ],
      solutionExplanation: 'Dengan mengunci $E$1, rumus dapat disalin ke ratusan baris barang tanpa khawatir referensi tarif pajak bergeser ke baris kosong.'
    },
    completionCriteria: [
      'Menguasai referensi absolut $A$1 vs referensi relatif A1.',
      'Bisa mencegah error rumus bergeser saat autofill.',
      'Siap menangani model keuangan profesional.'
    ]
  },
  {
    id: 'l3-m6',
    level: 3,
    levelName: 'Level 3 — Data Hero',
    title: 'Proyek Akhir Capstone: Master Finansial Perusahaan',
    description: 'Selesaikan studi kasus terintegrasi dari input mentah hingga laporan eksekutif lengkap.',
    durationMinutes: 35,
    xpReward: 200,
    babyAnalogy: 'Ujian kelulusan koki bintang lima: kamu meracik hidangan lengkap dari pembuka, hidangan utama, sampai penutup spektakuler!',
    objectives: [
      'Mengintegrasikan VLOOKUP, SUMIF, IF logika, dan metrik dashboard.',
      'Menghasilkan laporan keuangan yang 100% otomatis dan anti-error.',
      'Menyandang gelar resmi ExcelQuest Data Hero!'
    ],
    simpleExplanation: 'Di proyek akhir ini, kamu akan memproses data penjualan kotor, memotong pajak, menghitung komisi sales, dan merangkum laba bersih perusahaan dalam satu lembar kerja utuh.',
    exampleData: {
      headers: ['Metrik Capstone', 'Hasil Akhir'],
      rows: [
        ['Omset Kotor', 85000000],
        ['Beban Operasional', 32000000],
        ['Laba Bersih', 53000000]
      ],
      formulaDemo: '=B1-B2',
      resultDemo: '53000000'
    },
    exercise: {
      instruction: 'Di sel B3, hitung Laba Bersih perusahaan dengan mengurangkan Omset Kotor (B1) dengan Total Beban (B2). Ketik: =B1-B2',
      targetCell: 'B3',
      expectedFormulaPattern: /^=B1-B2$/i,
      expectedValue: 53000000,
      initialData: {
        A1: 'Omset Kotor', B1: '85000000',
        A2: 'Total Beban', B2: '32000000',
        A3: 'Laba Bersih Akhir', B3: ''
      },
      hints: [
        'Klik sel B3.',
        'Ketik: =B1-B2',
        'Tekan Enter. Laba bersih adalah 53.000.000.'
      ],
      solutionExplanation: 'Selamat! Kamu telah menyelesaikan seluruh 18 modul kurikulum ExcelQuest dari nol hingga mahir. Kamu kini siap terjun ke dunia kerja!'
    },
    completionCriteria: [
      'Menuntaskan seluruh modul Level 1, Level 2, dan Level 3.',
      'Menguasai formula aritmatika, logika, lookup, dan visualisasi.',
      'Mendapatkan badge resmi "Data Hero"!'
    ]
  }
];
