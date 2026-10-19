import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI if API key exists
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback dictionary for Bahasa Bayi when AI is unavailable or offline
const BABY_LANGUAGE_DICTIONARY: Record<string, {
  term: string;
  babyAnalogy: string;
  explanation: string;
  formulaExample: string;
  anotherExample: string;
  detail: string;
  practiceTip: string;
}> = {
  cell: {
    term: "Cell (Sel)",
    babyAnalogy: "Satu kotak kecil di sarang lebah tempat menyimpan 1 makanan.",
    explanation: "Cell adalah satu kotak pertemuan antara Kolom (huruf) dan Baris (angka). Contoh: A1 adalah kotak di kolom A baris 1.",
    formulaExample: "=A1",
    anotherExample: "Isi sel A1 dengan angka 50, lalu di sel B1 ketik =A1*2, hasilnya 100!",
    detail: "Cell bisa berisi 3 hal: Teks (huruf), Angka (nilai matematis), atau Rumus (diawali tanda sama dengan =).",
    practiceTip: "Klik sel B3 di Worksheet Studio, lalu ketik namamu dan tekan Enter!"
  },
  range: {
    term: "Range (Rentang Sel)",
    babyAnalogy: "Sekelompok kotak yang kamu sorot bersamaan, seperti sekotak telur isi 6.",
    explanation: "Range adalah kumpulan dua sel atau lebih. Ditulis dengan tanda titik dua (:). Misalnya A1:A5 artinya dari kotak A1 sampai A5.",
    formulaExample: "=SUM(A1:A5)",
    anotherExample: "B2:D10 artinya area kotak persegi panjang dari kolom B baris 2 sampai kolom D baris 10.",
    detail: "Range bisa berbentuk baris horizontal (A1:E1), kolom vertikal (B2:B20), atau blok tabel utuh (A1:D10).",
    practiceTip: "Coba sorot sel A1 sampai A4 dengan drag mouse di Worksheet Studio!"
  },
  sum: {
    term: "SUM",
    babyAnalogy: "Asisten kasir mini yang bertugas menjumlahkan semua belanjaan tanpa lelah.",
    explanation: "SUM dipakai untuk menjumlahkan semua angka di dalam kurung secara otomatis.",
    formulaExample: "=SUM(B2:B10)",
    anotherExample: "=SUM(10, 20, 30) langsung menghasilkan 60 tanpa perlu tulis 10+20+30.",
    detail: "Sintaks: =SUM(number1, [number2], ...). Jika di dalam rentang ada teks, SUM akan otomatis mengabaikannya dan hanya menjumlahkan angka.",
    practiceTip: "Buat daftar harga di A1:A3 lalu di A4 ketik =SUM(A1:A3)."
  },
  average: {
    term: "AVERAGE",
    babyAnalogy: "Hakim adil yang membagi rata permen ke semua anak.",
    explanation: "AVERAGE menghitung nilai rata-rata dari sekumpulan data angka.",
    formulaExample: "=AVERAGE(C2:C20)",
    anotherExample: "=AVERAGE(80, 90, 100) hasilnya 90.",
    detail: "Rumus ini menjumlahkan semua angka lalu membaginya dengan banyaknya sel yang berisi angka.",
    practiceTip: "Coba hitung rata-rata nilai ujian siswa di kolom Nilai dengan =AVERAGE(B2:B6)."
  },
  if: {
    term: "IF (Logika Jika-Maka)",
    babyAnalogy: "Satpam bioskop: 'Kalau punya tiket boleh masuk, kalau tidak harus beli dulu'.",
    explanation: "IF menguji kondisi: jika kondisi BENAR lakukan A, jika SALAH lakukan B.",
    formulaExample: '=IF(B2>=75, "LULUS", "REMIDIAL")',
    anotherExample: '=IF(C2>100000, "DAPAT DISKON", "TIDAK DISKON")',
    detail: "Sintaks: =IF(tes_logika, nilai_jika_benar, nilai_jika_salah). Jangan lupa beri tanda petik dua (\") untuk teks.",
    practiceTip: "Di Worksheet Studio coba buat sel B2 bernilai 80, lalu di C2 ketik =IF(B2>=75, \"Lulus\", \"Ulang\")."
  },
  sumif: {
    term: "SUMIF",
    babyAnalogy: "Kasir pintar yang hanya menjumlahkan barang yang warnanya pink.",
    explanation: "SUMIF menjumlahkan angka hanya jika baris tersebut memenuhi kriteria tertentu.",
    formulaExample: '=SUMIF(A2:A10, "Apel", B2:B10)',
    anotherExample: '=SUMIF(C2:C10, ">100000")',
    detail: "Sintaks: =SUMIF(rentang_kriteria, kriteria, [rentang_angka_yang_dijumlah]).",
    practiceTip: "Coba jumlahkan total penjualan khusus cabang 'Jakarta' dengan SUMIF!"
  },
  countif: {
    term: "COUNTIF",
    babyAnalogy: "Penghitung orang yang cuma menghitung yang pakai baju biru.",
    explanation: "COUNTIF menghitung banyaknya kotak yang cocok dengan syarat yang kamu minta.",
    formulaExample: '=COUNTIF(B2:B20, "Lulus")',
    anotherExample: '=COUNTIF(C2:C50, ">=80")',
    detail: "Sintaks: =COUNTIF(rentang, kriteria). Berbeda dengan SUMIF yang menjumlahkan nominal, COUNTIF hanya menghitung 'berapa baris'.",
    practiceTip: "Coba hitung berapa banyak siswa yang hadir dengan =COUNTIF(C2:C10, \"Hadir\")."
  },
  vlookup: {
    term: "VLOOKUP",
    babyAnalogy: "Pelayan resto yang melihat kode makanan di buku menu lalu membacakan harganya.",
    explanation: "VLOOKUP mencari nilai di kolom paling kiri tabel, lalu mengambil data di kolom sebelahnya.",
    formulaExample: '=VLOOKUP(E2, A2:C10, 3, FALSE)',
    anotherExample: '=VLOOKUP("BRG01", A2:C5, 2, FALSE) mencari kode BRG01 dan mengambil nama barang di kolom ke-2.',
    detail: "Sintaks: =VLOOKUP(nilai_dicari, tabel_referensi, nomor_kolom, [pencarian_tepat/FALSE]). Angka 3 artinya ambil kolom ke-3.",
    practiceTip: "Gunakan VLOOKUP untuk mencocokkan ID Member dengan Nama Pelanggan secara otomatis!"
  },
  xlookup: {
    term: "XLOOKUP",
    babyAnalogy: "Drone serbaguna yang bisa mencari barang ke kiri, kanan, atas, maupun bawah.",
    explanation: "XLOOKUP adalah pengganti modern VLOOKUP yang jauh lebih mudah, fleksibel, dan tahan banting.",
    formulaExample: '=XLOOKUP(E2, A2:A10, C2:C10, "Tidak Ditemukan")',
    anotherExample: '=XLOOKUP(D2, B2:B20, A2:A20) bisa mencari ke arah kiri tanpa batas!',
    detail: "Sintaks: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found]). Tidak perlu hitung nomor kolom secara manual lagi.",
    practiceTip: "Ganti rumus VLOOKUP lamamu dengan XLOOKUP agar tabelmu tidak error saat ada kolom baru disisipkan."
  },
  filter: {
    term: "Filter & Sort",
    babyAnalogy: "Saringan tepung dapur yang hanya meloloskan tepung halus dan membuang kerikil.",
    explanation: "Filter menyembunyikan data yang tidak ingin kamu lihat sementara waktu tanpa menghapusnya.",
    formulaExample: '=FILTER(A2:C10, B2:B10="Elektronik")',
    anotherExample: "Klik tombol Filter di ribbon Excel untuk memunculkan panah kecil di judul kolom.",
    detail: "Sort mengurutkan dari A ke Z atau terkecil ke terbesar. Filter menyaring baris berdasarkan kriteria teks/angka/tanggal.",
    practiceTip: "Aktifkan filter pada tabel penjualan untuk melihat data transaksi bulan ini saja."
  },
  pivottable: {
    term: "PivotTable",
    babyAnalogy: "Robot pembuat lego yang menyulap ribuan kepingan berantakan menjadi istana ringkas dalam 3 detik.",
    explanation: "PivotTable adalah alat sakti untuk merangkum, menghitung, dan menganalisis ribuan baris data dalam sekejap.",
    formulaExample: "Insert > PivotTable (Tarik 'Kategori' ke Rows dan 'Total Penjualan' ke Values)",
    anotherExample: "Ubah 5.000 data transaksi menjadi tabel rekap penjualan per cabang dan per bulan dengan drag-and-drop.",
    detail: "PivotTable terdiri dari 4 area: Filters, Columns, Rows, dan Values. Sangat cepat dan tidak perlu menulis banyak rumus rumit.",
    practiceTip: "Gunakan PivotTable saat disuruh bos membuat rekap omset tahunan dalam 5 menit."
  },
  error: {
    term: "Error Decoder (Tanda Error)",
    babyAnalogy: "Lampu indikator di dashboard mobil: memberitahu kamu bagian mana yang butuh diperiksa.",
    explanation: "Error Excel bukanlah bencana, melainkan petunjuk cerdas tempat kesalahan ketik atau logika berada.",
    formulaExample: "#DIV/0! (pembagi nol), #N/A (tidak ketemu), #VALUE! (salah tipe data)",
    anotherExample: "Ketik =10/0 maka muncul #DIV/0! karena dalam matematika angka tidak bisa dibagi nol.",
    detail: "Gunakan rumus =IFERROR(rumus_utama, nilai_cadangan) agar tampilan tabel tetap rapi dan profesional.",
    practiceTip: "Bungkus rumusmu dengan IFERROR: =IFERROR(VLOOKUP(...), \"Data Belum Ada\")."
  }
};

// API Route: Bahasa Bayi AI Explainer
app.post('/api/explain-baby', async (req, res) => {
  try {
    const { question, mode = 'baby', contextTopic } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Pertanyaan atau istilah Excel tidak boleh kosong.' });
      return;
    }

    const cleanQuery = question.trim().toLowerCase();

    // Check if query matches our rich dictionary
    let matchedKey: string | null = null;
    for (const key of Object.keys(BABY_LANGUAGE_DICTIONARY)) {
      if (cleanQuery.includes(key) || key.includes(cleanQuery)) {
        matchedKey = key;
        break;
      }
    }

    // If Gemini client is available, try AI first for personalized natural response
    if (ai) {
      try {
        const systemPrompt = `Kamu adalah Kak Questy, maskot dan mentor ramah di ExcelQuest ("Play. Practice. Master Excel.").
Tugasmu adalah menjelaskan konsep, fungsi, rumus, atau error Microsoft Excel kepada pemula menggunakan "Bahasa Bayi 🧸" (Bahasa Indonesia sehari-hari, santai, ceria, penuh analogi sederhana dan konkret yang mudah dibayangkan).

Gaya jawaban:
- Mode "${mode}":
  * jika mode 'baby': fokus analogi benda sehari-hari (mainan, kotak bekal, kasir, satpam, antrean, saringan dapur).
  * jika mode 'example': berikan tabel data mini sederhana dan rumus Excel yang bisa dicoba langsung.
  * jika mode 'more_example': berikan variasi kasus lain yang menarik dan realistis.
  * jika mode 'detail': jelaskan sintaks, parameter, aturan tanda petik, koma vs titik koma, dan tips pro.
  * jika mode 'practice': berikan soal latihan tantangan singkat dengan data dan target hasil.
- Tetap akurat secara teknis Excel. Jangan buat informasi palsu.
- Jika pengguna bertanya hal di luar Excel, arahkan dengan ramah kembali ke topik Excel.
- Gunakan format teks yang enak dibaca (bullet points, contoh rumus diawali =).`;

        const userPrompt = `Topik/Pertanyaan: "${question}".
Mode penjelasan: ${mode}.
Konteks tambahan: ${contextTopic || 'Belajar dasar Excel'}.
Berikan penjelasan Bahasa Bayi yang sangat ramah, jelas, dan seru!`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          res.json({
            source: 'ai',
            explanation: textOutput,
            matchedKey: matchedKey,
            dictionaryFallback: matchedKey ? BABY_LANGUAGE_DICTIONARY[matchedKey] : null,
          });
          return;
        }
      } catch (aiErr) {
        console.warn('Gemini API call failed, falling back to local dictionary:', aiErr);
      }
    }

    // Fallback dictionary handling
    if (matchedKey && BABY_LANGUAGE_DICTIONARY[matchedKey]) {
      const entry = BABY_LANGUAGE_DICTIONARY[matchedKey];
      let responseText = "";
      if (mode === 'baby') {
        responseText = `🧸 **Bahasa Bayi: ${entry.term}**\n\n💡 *Analogi sederhana:* ${entry.babyAnalogy}\n\n📖 *Penjelasan:* ${entry.explanation}\n\n⌨️ *Contoh rumus:* \`${entry.formulaExample}\``;
      } else if (mode === 'example') {
        responseText = `✨ **Contoh Nyata ${entry.term}**\n\n${entry.formulaExample}\n\n👉 *Penerapan:* ${entry.anotherExample}`;
      } else if (mode === 'more_example') {
        responseText = `🎯 **Contoh Tambahan ${entry.term}**\n\n${entry.anotherExample}\n\n💡 *Tips:* ${entry.practiceTip}`;
      } else if (mode === 'detail') {
        responseText = `🔍 **Penjelasan Lebih Detail: ${entry.term}**\n\n${entry.detail}\n\nSintaks umum: \`${entry.formulaExample}\``;
      } else if (mode === 'practice') {
        responseText = `🏋️ **Latihan Kilat ${entry.term}**\n\n${entry.practiceTip}\n\nBuka tab **Worksheet Studio** di atas untuk langsung mencoba rumus ini!`;
      }

      res.json({
        source: 'dictionary',
        explanation: responseText,
        matchedKey: matchedKey,
        dictionaryFallback: entry,
      });
      return;
    }

    // Generic friendly answer when not in dictionary and AI is offline
    res.json({
      source: 'dictionary',
      explanation: `🧸 **Bahasa Bayi untuk "${question}"**\n\nDi Excel, setiap kotak disebut **Cell**, kumpulan kotak disebut **Range**, dan tanda **=** adalah mantra ajaib untuk menyuruh Excel berhitung otomatis.\n\nContoh rumus yang sering dipakai:\n• \`=SUM(A1:A5)\` untuk menjumlahkan angka\n• \`=AVERAGE(A1:A5)\` untuk menghitung rata-rata\n• \`=IF(A1>50, "Bagus", "Coba Lagi")\` untuk aturan logika.\n\nCoba ketik rumus ini langsung di **Worksheet Studio**!`,
      matchedKey: null,
      dictionaryFallback: BABY_LANGUAGE_DICTIONARY['cell'],
    });
  } catch (error) {
    console.error('Error in /api/explain-baby:', error);
    res.status(500).json({ error: 'Terjadi kendala saat memproses penjelasan.' });
  }
});

// Setup Vite development server or serve production build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ExcelQuest server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
