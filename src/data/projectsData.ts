import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-budget',
    title: 'Budget Bulanan & Tabungan Anak Kos / Mahasiswa',
    category: 'Keuangan Pribadi',
    difficulty: 'Pemula',
    estimatedTime: '20 Menit',
    xpReward: 150,
    scenario: 'Kamu menerima uang saku dan penghasilan sampingan sebesar Rp 3.500.000 per bulan. Susun rencana alokasi untuk pos Kebutuhan Pokok, Tempat Tinggal, Edukasi, dan Tabungan. Hitung total pengeluaran, sisa uang bebas (surplus/defisit), serta persentase tabungan dengan formula Excel.',
    initialSheetData: {
      A1: 'Kategori Pengeluaran', B1: 'Anggaran (Rp)', C1: 'Realisasi (Rp)', D1: 'Selisih (B-C)',
      A2: 'Kost & Utilitas', B2: '1200000', C2: '1200000', D2: '=B2-C2',
      A3: 'Makan & Minum', B3: '1000000', C3: '1150000', D3: '=B3-C3',
      A4: 'Transport & Bensin', B4: '300000', C4: '280000', D4: '=B4-C4',
      A5: 'Internet & Pulsa', B5: '150000', C5: '150000', D5: '=B5-C5',
      A6: 'Tabungan & Investasi', B6: '500000', C6: '500000', D6: '=B6-C6',
      A7: 'Hiburan & Ngopi', B7: '250000', C7: '320000', D7: '=B7-C7',
      A8: 'Total Pengeluaran', B8: '', C8: '', D8: '',
      A9: '', B9: '', C9: '', D9: '',
      A10: 'Total Pemasukan Bulanan', B10: '3500000', C10: '', D10: '',
      A11: 'Sisa Saldo Kas', B11: '', C11: '', D11: ''
    },
    tasks: [
      {
        id: 'task-1',
        instruction: 'Hitung total Anggaran di sel B8 menggunakan rumus =SUM(B2:B7)',
        targetCell: 'B8',
        checkType: 'both',
        expectedFormulaPattern: '^=SUM\\(B2:B7\\)$',
        expectedValue: 3400000,
        explanation: 'Fungsi SUM menjumlahkan seluruh rencana pos anggaran dari B2 sampai B7.'
      },
      {
        id: 'task-2',
        instruction: 'Hitung total Realisasi pengeluaran sebenarnya di sel C8 menggunakan rumus =SUM(C2:C7)',
        targetCell: 'C8',
        checkType: 'both',
        expectedFormulaPattern: '^=SUM\\(C2:C7\\)$',
        expectedValue: 3600000,
        explanation: 'Total realisasi menunjukkan apakah pengeluaran aktual melebihi rencana awal.'
      },
      {
        id: 'task-3',
        instruction: 'Hitung Sisa Saldo Kas aktual di sel B11 dengan mengurangkan Pemasukan (B10) dengan Total Realisasi (C8): =B10-C8',
        targetCell: 'B11',
        checkType: 'both',
        expectedFormulaPattern: '^=B10-C8$',
        expectedValue: -100000,
        explanation: 'Hasil -100000 (defisit) menandakan pengeluaran aktual bulan ini overbudget sebesar 100 ribu karena pos makan dan ngopi membengkak.'
      }
    ],
    rubric: [
      { criteria: 'Ketepatan formula SUM untuk kolom Anggaran dan Realisasi', points: 40 },
      { criteria: 'Kalkulasi sisa kas bersih (Pemasukan dikurangi Realisasi)', points: 40 },
      { criteria: 'Penggunaan referensi sel tanpa hardcode angka manual', points: 20 }
    ],
    solutionGuide: [
      { step: '1. Total Anggaran', cell: 'B8', formula: '=SUM(B2:B7)', reason: 'Menjumlahkan batas alokasi dana bulanan.' },
      { step: '2. Total Pengeluaran Nyata', cell: 'C8', formula: '=SUM(C2:C7)', reason: 'Menjumlahkan struk pengeluaran aktual.' },
      { step: '3. Selisih Defisit/Surplus', cell: 'D8', formula: '=B8-C8', reason: 'Mengevaluasi selisih keseluruhan.' },
      { step: '4. Sisa Kas', cell: 'B11', formula: '=B10-C8', reason: 'Mengetahui sisa uang riil di rekening bank.' }
    ]
  },
  {
    id: 'proj-sales',
    title: 'Laporan Penjualan Retail & Margin Keuntungan Toko',
    category: 'Bisnis & Penjualan',
    difficulty: 'Menengah',
    estimatedTime: '25 Menit',
    xpReward: 180,
    scenario: 'Sebagai supervisor toko, kamu diminta merekap nota penjualan kasir harian. Hitung Pendapatan Kotor (Qty x Harga Jual), Modal Pokok (Qty x HPP), Laba Kotor (Pendapatan - Modal), dan rata-rata margin keuntungan toko.',
    initialSheetData: {
      A1: 'Nama Produk', B1: 'Qty', C1: 'HPP / Modal', D1: 'Harga Jual', E1: 'Pendapatan', F1: 'Laba Kotor',
      A2: 'Mouse Bluetooth', B2: '15', C2: '45000', D2: '75000', E2: '=B2*D2', F2: '=E2-(B2*C2)',
      A3: 'Keyboard Mechanical', B3: '8', C3: '180000', D3: '270000', E3: '=B3*D3', F3: '=E3-(B3*C3)',
      A4: 'Headset Gaming', B4: '10', C4: '95000', D4: '150000', E4: '=B4*D4', F4: '=E4-(B4*C4)',
      A5: 'Webcam HD 1080p', B5: '5', C5: '120000', D5: '190000', E5: '=B5*D5', F5: '=E5-(B5*C5)',
      A6: 'Total Keseluruhan', B6: '=SUM(B2:B5)', C6: '', D6: '', E6: '', F6: ''
    },
    tasks: [
      {
        id: 'task-1',
        instruction: 'Hitung Total Pendapatan toko di sel E6 menggunakan rumus =SUM(E2:E5)',
        targetCell: 'E6',
        checkType: 'both',
        expectedFormulaPattern: '^=SUM\\(E2:E5\\)$',
        expectedValue: 5735000,
        explanation: 'Menjumlahkan omset kotor dari seluruh produk aksesori komputer.'
      },
      {
        id: 'task-2',
        instruction: 'Hitung Total Laba Kotor bersih toko di sel F6 menggunakan rumus =SUM(F2:F5)',
        targetCell: 'F6',
        checkType: 'both',
        expectedFormulaPattern: '^=SUM\\(F2:F5\\)$',
        expectedValue: 2070000,
        explanation: 'Total keuntungan kotor yang didapatkan setelah dikurangi modal barang.'
      }
    ],
    rubric: [
      { criteria: 'Kalkulasi Pendapatan dan Laba per unit barang', points: 30 },
      { criteria: 'Agregasi total omset dan laba menggunakan SUM', points: 40 },
      { criteria: 'Konsistensi rumus antar baris tabel', points: 30 }
    ],
    solutionGuide: [
      { step: '1. Pendapatan per Item', cell: 'E2', formula: '=B2*D2', reason: 'Jumlah unit terjual dikali harga banderol jual.' },
      { step: '2. Laba per Item', cell: 'F2', formula: '=E2-(B2*C2)', reason: 'Pendapatan dikurangi total modal HPP unit tersebut.' },
      { step: '3. Total Omset Toko', cell: 'E6', formula: '=SUM(E2:E5)', reason: 'Grand total penjualan kasir hari ini.' },
      { step: '4. Total Keuntungan', cell: 'F6', formula: '=SUM(F2:F5)', reason: 'Grand total laba bersih toko.' }
    ]
  },
  {
    id: 'proj-stock',
    title: 'Manajemen Stok Gudang & Restock Alert Otomatis',
    category: 'Operasional & Gudang',
    difficulty: 'Menengah',
    estimatedTime: '25 Menit',
    xpReward: 190,
    scenario: 'Manajer gudang membutuhkan sistem yang otomatis memberikan peringatan "RESTOCK SEGERA" jika sisa stok barang turun di bawah Batas Minimum (Safety Stock), dan "AMAN" jika stok masih mencukupi.',
    initialSheetData: {
      A1: 'Kode SKU', B1: 'Nama Barang', C1: 'Stok Awal', D1: 'Terjual', E1: 'Sisa Stok', F1: 'Min. Safety', G1: 'Status Alert',
      A2: 'SKU-01', B2: 'Kertas A4 Rim', C2: '100', D2: '85', E2: '=C2-D2', F2: '20', G2: '',
      A3: 'SKU-02', B3: 'Tinta Printer Hitam', C3: '40', D3: '15', E3: '=C3-D3', F3: '10', G3: '',
      A4: 'SKU-03', B4: 'Stapler Besar', C4: '25', D4: '22', E4: '=C4-D4', F4: '5', G4: '',
      A5: 'SKU-04', B5: 'Map Dokumen', C5: '80', D5: '30', E5: '=C5-D5', F5: '15', G5: ''
    },
    tasks: [
      {
        id: 'task-1',
        instruction: 'Di sel G2, gunakan fungsi IF untuk mengecek: Jika Sisa Stok (E2) lebih kecil atau sama dengan Min. Safety (F2), tampilkan "RESTOCK", jika tidak tampilkan "AMAN". Rumus: =IF(E2<=F2, "RESTOCK", "AMAN")',
        targetCell: 'G2',
        checkType: 'both',
        expectedFormulaPattern: '^=IF\\(E2<=F2,\\s*"RESTOCK",\\s*"AMAN"\\)$',
        expectedValue: 'RESTOCK',
        explanation: 'Sisa stok Kertas A4 hanya 15 rim, padahal batas amannya 20 rim, sehingga memicu peringatan RESTOCK.'
      },
      {
        id: 'task-2',
        instruction: 'Di sel G3, terapkan rumus yang sama untuk SKU-02: =IF(E3<=F3, "RESTOCK", "AMAN")',
        targetCell: 'G3',
        checkType: 'both',
        expectedFormulaPattern: '^=IF\\(E3<=F3,\\s*"RESTOCK",\\s*"AMAN"\\)$',
        expectedValue: 'AMAN',
        explanation: 'Sisa stok Tinta masih 25 pcs (lebih besar dari safety stock 10 pcs), sehingga statusnya AMAN.'
      }
    ],
    rubric: [
      { criteria: 'Penerapan rumus selisih stok (Awal - Terjual)', points: 30 },
      { criteria: 'Logika bersyarat IF untuk menentukan alert restock', points: 50 },
      { criteria: 'Pencegahan kekurangan stok operasional', points: 20 }
    ],
    solutionGuide: [
      { step: '1. Sisa Stok', cell: 'E2', formula: '=C2-D2', reason: 'Mengurangi stok masuk dengan barang keluar.' },
      { step: '2. Pemicu Restock', cell: 'G2', formula: '=IF(E2<=F2, "RESTOCK", "AMAN")', reason: 'Mendeteksi otomatis barang menipis.' }
    ]
  },
  {
    id: 'proj-attendance',
    title: 'Rekap Absensi Tim & Perhitungan Bonus Kehadiran',
    category: 'HR & Kepegawaian',
    difficulty: 'Menengah',
    estimatedTime: '30 Menit',
    xpReward: 200,
    scenario: 'Divisi HR perlu merekap kehadiran 4 karyawan selama 5 hari kerja (Senin-Jumat). Hitung berapa hari masing-masing karyawan "Hadir" menggunakan COUNTIF, lalu berikan Bonus Kehadiran Rp 100.000 jika hadir penuh 5 hari dengan rumus IF.',
    initialSheetData: {
      A1: 'Karyawan', B1: 'Senin', C1: 'Selasa', D1: 'Rabu', E1: 'Kamis', F1: 'Jumat', G1: 'Total Hadir', H1: 'Bonus Kehadiran',
      A2: 'Dimas', B2: 'Hadir', C2: 'Hadir', D2: 'Hadir', E2: 'Hadir', F2: 'Hadir', G2: '', H2: '',
      A3: 'Saras', B3: 'Hadir', C3: 'Izin', D3: 'Hadir', E3: 'Hadir', F3: 'Hadir', G3: '=COUNTIF(B3:F3, "Hadir")', H3: '=IF(G3=5, 100000, 0)',
      A4: 'Tomi', B4: 'Hadir', C4: 'Hadir', D4: 'Hadir', E4: 'Sakit', F4: 'Hadir', G4: '=COUNTIF(B4:F4, "Hadir")', H4: '=IF(G4=5, 100000, 0)',
      A5: 'Zahra', B5: 'Hadir', C5: 'Hadir', D5: 'Hadir', E5: 'Hadir', F5: 'Hadir', G5: '=COUNTIF(B5:F5, "Hadir")', H5: '=IF(G5=5, 100000, 0)'
    },
    tasks: [
      {
        id: 'task-1',
        instruction: 'Hitung berapa hari Dimas hadir di sel G2 dengan rumus: =COUNTIF(B2:F2, "Hadir")',
        targetCell: 'G2',
        checkType: 'both',
        expectedFormulaPattern: '^=COUNTIF\\(B2:F2,\\s*"Hadir"\\)$',
        expectedValue: 5,
        explanation: 'COUNTIF menghitung banyaknya teks "Hadir" di baris hari kerja Senin sampai Jumat.'
      },
      {
        id: 'task-2',
        instruction: 'Di sel H2, berikan bonus 100000 jika total hadir (G2) sama dengan 5, jika tidak berikan 0. Ketik: =IF(G2=5, 100000, 0)',
        targetCell: 'H2',
        checkType: 'both',
        expectedFormulaPattern: '^=IF\\(G2=5,\\s*100000,\\s*0\\)$',
        expectedValue: 100000,
        explanation: 'Karena Dimas hadir 5 hari penuh, sistem otomatis menetapkan bonus Rp 100.000.'
      }
    ],
    rubric: [
      { criteria: 'Menghitung frekuensi kehadiran dengan COUNTIF string match', points: 40 },
      { criteria: 'Kondisi IF untuk perhitungan reward bonus', points: 40 },
      { criteria: 'Otomatisasi payroll tanpa pengecekan manual satu-satu', points: 20 }
    ],
    solutionGuide: [
      { step: '1. Hitung Kehadiran', cell: 'G2', formula: '=COUNTIF(B2:F2, "Hadir")', reason: 'Menyaring status kehadiran tiap karyawan.' },
      { step: '2. Logika Reward', cell: 'H2', formula: '=IF(G2=5, 100000, 0)', reason: 'Insentif hanya bagi absensi sempurna 100%.' }
    ]
  },
  {
    id: 'proj-cashflow',
    title: 'Rekap Arus Kas Transaksi & Saldo Berjalan Kasir',
    category: 'Akuntansi & Kasir',
    difficulty: 'Mahir',
    estimatedTime: '30 Menit',
    xpReward: 220,
    scenario: 'Kelola buku kas harian mini market. Tiap baris mencatat Tanggal, Uraian, Kas Masuk (Debit), Kas Keluar (Kredit), dan Saldo Berjalan (Running Balance). Hitung total kas masuk, total kas keluar, dan saldo kas akhir yang akurat.',
    initialSheetData: {
      A1: 'No', B1: 'Keterangan Transaksi', C1: 'Masuk (Rp)', D1: 'Keluar (Rp)', E1: 'Saldo Berjalan',
      A2: '1', B2: 'Modal Kas Awal', C2: '1000000', D2: '0', E2: '=C2-D2',
      A3: '2', B3: 'Penjualan Pagi', C3: '450000', D3: '0', E3: '=E2+C3-D3',
      A4: '3', B4: 'Beli Galon & Kopi Staf', C4: '0', D4: '55000', E4: '=E3+C4-D4',
      A5: '4', B5: 'Penjualan Siang', C5: '620000', D5: '0', E5: '=E4+C5-D5',
      A6: '5', B6: 'Biaya Kebersihan & Sampah', C6: '0', D6: '25000', E6: '=E5+C6-D6',
      A7: 'Total Rekap Kas', B7: '', C7: '', D7: '', E7: ''
    },
    tasks: [
      {
        id: 'task-1',
        instruction: 'Hitung total seluruh uang kas masuk di sel C7 menggunakan rumus: =SUM(C2:C6)',
        targetCell: 'C7',
        checkType: 'both',
        expectedFormulaPattern: '^=SUM\\(C2:C6\\)$',
        expectedValue: 2070000,
        explanation: 'Total seluruh penerimaan kas (modal awal + transaksi penjualan).'
      },
      {
        id: 'task-2',
        instruction: 'Hitung total seluruh pengeluaran kas di sel D7 menggunakan rumus: =SUM(D2:D6)',
        targetCell: 'D7',
        checkType: 'both',
        expectedFormulaPattern: '^=SUM\\(D2:D6\\)$',
        expectedValue: 80000,
        explanation: 'Total kas yang keluar untuk operasional toko.'
      },
      {
        id: 'task-3',
        instruction: 'Hitung Saldo Akhir kas fisik di sel E7 dengan mengurangkan Total Masuk (C7) dengan Total Keluar (D7): =C7-D7',
        targetCell: 'E7',
        checkType: 'both',
        expectedFormulaPattern: '^=C7-D7$',
        expectedValue: 1990000,
        explanation: 'Saldo akhir di E7 bernilai 1.990.000, persis sama dengan saldo berjalan baris terakhir di sel E6!'
      }
    ],
    rubric: [
      { criteria: 'Pemahaman konsep saldo berjalan (Saldo Sebelum + Masuk - Keluar)', points: 30 },
      { criteria: 'Kalkulasi neraca arus kas masuk dan keluar', points: 40 },
      { criteria: 'Rekonsiliasi saldo akhir kasir dengan buku fisik', points: 30 }
    ],
    solutionGuide: [
      { step: '1. Saldo Baris Awal', cell: 'E2', formula: '=C2-D2', reason: 'Saldo pertama adalah kas awal.' },
      { step: '2. Running Balance', cell: 'E3', formula: '=E2+C3-D3', reason: 'Saldo sebelumnya ditambah masuk dikurang keluar.' },
      { step: '3. Total Masuk', cell: 'C7', formula: '=SUM(C2:C6)', reason: 'Agregasi seluruh debit.' },
      { step: '4. Total Keluar', cell: 'D7', formula: '=SUM(D2:D6)', reason: 'Agregasi seluruh kredit.' },
      { step: '5. Saldo Akhir Rekonsiliasi', cell: 'E7', formula: '=C7-D7', reason: 'Cross-check mutlak kebenaran pembukuan.' }
    ]
  },
  {
    id: 'proj-dashboard',
    title: 'Executive Sales Dashboard & Analisis Cabang',
    category: 'Business Intelligence',
    difficulty: 'Mahir',
    estimatedTime: '35 Menit',
    xpReward: 250,
    scenario: 'Direktur ingin melihat mini dashboard ringkasan penjualan kuartal ini. Buat KPI Card untuk Rata-rata Penjualan, Cabang Penjualan Tertinggi (MAX), Cabang Penjualan Terendah (MIN), serta total omset gabungan dari 4 kota.',
    initialSheetData: {
      A1: 'Cabang Kota', B1: 'Total Transaksi', C1: 'Omset Cabang (Rp)', D1: '', E1: 'METRIK KPI', F1: 'NILAI',
      A2: 'Jakarta Pusat', B2: '1420', C2: '285000000', D2: '', E2: 'Total Omset Nasional', F2: '=SUM(C2:C5)',
      A3: 'Surabaya Timur', B3: '980', C3: '165000000', D3: '', E3: 'Rata-rata per Cabang', F3: '',
      A4: 'Bandung Dago', B4: '840', C4: '135000000', D4: '', E4: 'Cabang Tertinggi', F4: '',
      A5: 'Medan Kota', B5: '610', C5: '95000000', D5: '', E5: 'Cabang Terendah', F5: '=MIN(C2:C5)'
    },
    tasks: [
      {
        id: 'task-1',
        instruction: 'Hitung Rata-rata Penjualan per Cabang di sel F3 menggunakan rumus: =AVERAGE(C2:C5)',
        targetCell: 'F3',
        checkType: 'both',
        expectedFormulaPattern: '^=AVERAGE\\(C2:C5\\)$',
        expectedValue: 170000000,
        explanation: 'Rata-rata penjualan per cabang adalah Rp 170.000.000.'
      },
      {
        id: 'task-2',
        instruction: 'Tampilkan nilai penjualan Cabang Tertinggi di sel F4 menggunakan rumus: =MAX(C2:C5)',
        targetCell: 'F4',
        checkType: 'both',
        expectedFormulaPattern: '^=MAX\\(C2:C5\\)$',
        expectedValue: 285000000,
        explanation: 'Nilai penjualan cabang tertinggi dipegang oleh Jakarta Pusat sebesar Rp 285.000.000.'
      }
    ],
    rubric: [
      { criteria: 'Kerapian struktur tabel master vs panel KPI metrik', points: 30 },
      { criteria: 'Penggunaan fungsi AVERAGE dan MAX statistik', points: 40 },
      { criteria: 'Kesesuaian data dengan kebutuhan presentasi pimpinan', points: 30 }
    ],
    solutionGuide: [
      { step: '1. Total Nasional', cell: 'F2', formula: '=SUM(C2:C5)', reason: 'Omset agregat seluruh cabang.' },
      { step: '2. Rata-rata KPI', cell: 'F3', formula: '=AVERAGE(C2:C5)', reason: 'Benchmark performa standar cabang.' },
      { step: '3. Cabang Tertinggi', cell: 'F4', formula: '=MAX(C2:C5)', reason: 'Mengidentifikasi cabang juara (top performer).' },
      { step: '4. Cabang Terendah', cell: 'F5', formula: '=MIN(C2:C5)', reason: 'Menandai cabang yang membutuhkan pendampingan.' }
    ]
  }
];
