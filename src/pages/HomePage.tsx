import React from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Table,
  Flame,
  FolderGit2,
  CheckCircle2,
  Play,
  Lightbulb,
  Award,
  Search
} from 'lucide-react';
import { ActiveTab } from '../types';
import heroImg from '../assets/images/hero_spreadsheet_quest_1792382945519.jpg';
import mascotImg from '../assets/images/mascot_baby_analyst_1792382946381.jpg';
import projectPreviewImg from '../assets/images/project_budget_preview_1792382946299.jpg';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBabyLanguage: (topic?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenBabyLanguage }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8DCE9] border border-pink-200 text-[#263449] text-xs font-semibold shadow-xs">
                <span>🧸</span>
                <span>Belajar Excel Tanpa Pusing & Tanpa Rumit</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#263449] leading-[1.15]" style={{ textWrap: 'balance' }}>
                Play. Practice. <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-600 bg-clip-text text-transparent">Master Excel.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#5E6D80] max-w-xl leading-relaxed">
                Platform belajar Microsoft Excel interaktif pertama dengan penjelasan <strong>Bahasa Bayi 🧸</strong>, spreadsheet studio langsung di browser, daily quest harian, dan proyek dunia nyata.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('learning-path')}
                  className="px-6 py-3.5 bg-[#263449] hover:bg-[#1a2534] text-white font-bold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="w-4 h-4 text-pink-300" />
                </button>
                <button
                  onClick={() => setActiveTab('worksheet-studio')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-[#263449] font-bold rounded-2xl text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Table className="w-4 h-4 text-sky-600" />
                  <span>Coba Worksheet</span>
                </button>
                <button
                  onClick={() => onOpenBabyLanguage()}
                  className="px-4 py-3.5 bg-[#F8DCE9]/80 hover:bg-[#F8DCE9] text-pink-900 border border-pink-300 font-semibold rounded-2xl text-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>🧸 Tanya Bahasa Bayi</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#5E6D80]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Formula Engine Langsung di Browser</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Gratis Tanpa Install Software</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ekspor Hasil ke .XLSX & .CSV</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-[#F8DCE9] to-[#DDECFF]">
                <img
                  src={heroImg}
                  alt="Ilustrasi Spreadsheet ExcelQuest"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                />
                {/* Floating interactive card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl select-none">🧸</span>
                    <div>
                      <div className="text-xs font-bold text-[#263449]">Kak Questy siap bantu!</div>
                      <div className="text-[11px] text-[#5E6D80]">"Cell itu kotak bento kecil..."</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenBabyLanguage('cell')}
                    className="px-3 py-1.5 bg-[#263449] text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Buka
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlight: Tools Bahasa Bayi Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#F8DCE9] via-[#FFFAFD] to-[#DDECFF] rounded-3xl p-6 sm:p-10 border border-pink-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Mascot Avatar */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-md border-4 border-white bg-white">
                <img
                  src={mascotImg}
                  alt="Mascot Kak Questy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Teaser Content */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Fitur Unggulan ExcelQuest
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263449]">
                Tools Bahasa Bayi 🧸: Bingung Rumus? Jelaskan Seperti ke Teman Sendiri
              </h2>
              <p className="text-sm text-[#5E6D80] leading-relaxed">
                Pernah pusing membaca dokumentasi Excel berbahasa robot? Di ExcelQuest, kamu bisa memilih istilah apa saja atau menanyakan rumus dan error yang sedang kamu hadapi. Kak Questy akan menjelaskannya dengan analogi sederhana yang langsung nempel di kepala!
              </p>

              {/* Sample Analogy Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white/90 rounded-xl border border-pink-100 shadow-2xs">
                  <div className="font-bold text-xs text-pink-700">Cell = Kotak Bento</div>
                  <div className="text-[11px] text-slate-600 mt-1">Satu kotak kecil tempat menyimpan 1 potong makanan.</div>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-sky-100 shadow-2xs">
                  <div className="font-bold text-xs text-sky-700">SUM = Kasir Mini</div>
                  <div className="text-[11px] text-slate-600 mt-1">Asisten kasir yang menjumlahkan semua barang otomatis.</div>
                </div>
                <div className="p-3 bg-white/90 rounded-xl border border-purple-100 shadow-2xs">
                  <div className="font-bold text-xs text-purple-700">IF = Satpam Bioskop</div>
                  <div className="text-[11px] text-slate-600 mt-1">"Kalau punya tiket boleh masuk, kalau tidak beli dulu!"</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBabyLanguage()}
                  className="px-5 py-2.5 bg-[#263449] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Coba Tools Bahasa Bayi Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-[#5E6D80]">Tersedia 5 mode penjelasan interaktif.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Learning Paths Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-pink-600">Jalur Belajar Terstruktur</div>
          <h2 className="text-3xl font-extrabold text-[#263449]">Tiga Level untuk Menguasai Excel</h2>
          <p className="text-sm text-[#5E6D80]">
            Mulai dari nol tanpa rasa takut, lalu berkembang menjadi analis data yang diperhitungkan di tempat kerja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Level 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#F8DCE9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F8DCE9] text-pink-700 flex items-center justify-center font-bold text-lg">
                L1
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#263449]">Starter</h3>
                <p className="text-xs text-slate-500 mt-1">Fondasi kokoh bagi pemula total.</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li className="flex items-center gap-2">✓ Workbook, Sheet, Baris & Kolom</li>
                <li className="flex items-center gap-2">✓ Format Angka vs Teks</li>
                <li className="flex items-center gap-2">✓ Tanda = dan Matematika Dasar</li>
                <li className="flex items-center gap-2">✓ SUM, AVERAGE, MIN, MAX, COUNT</li>
                <li className="flex items-center gap-2">✓ Sortir & Filter Data</li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('learning-path')}
              className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-[#F8DCE9] text-pink-900 font-bold text-xs rounded-xl border border-pink-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>Buka Modul Starter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Level 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#DDECFF] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between ring-2 ring-sky-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DDECFF] text-sky-700 flex items-center justify-center font-bold text-lg">
                L2
              </div>
              <div>
                <div className="inline-block px-2 py-0.5 bg-sky-100 text-sky-800 rounded-md text-[10px] font-bold uppercase mb-1">
                  Paling Populer
                </div>
                <h3 className="text-lg font-bold text-[#263449]">Formula Explorer</h3>
                <p className="text-xs text-slate-500 mt-1">Kuasai logika dan pencarian data.</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li className="flex items-center gap-2">✓ Fungsi Logika IF dan Relasional</li>
                <li className="flex items-center gap-2">✓ SUMIF & COUNTIF Bersyarat</li>
                <li className="flex items-center gap-2">✓ Potong Teks & Gabung String</li>
                <li className="flex items-center gap-2">✓ The King: VLOOKUP & XLOOKUP</li>
                <li className="flex items-center gap-2">✓ Penanganan Error dengan IFERROR</li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('learning-path')}
              className="mt-6 w-full py-2.5 bg-sky-50 hover:bg-[#DDECFF] text-sky-900 font-bold text-xs rounded-xl border border-sky-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>Buka Formula Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Level 3 */}
          <div className="bg-white rounded-3xl p-6 border border-[#F8DCE9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F8DCE9] to-[#DDECFF] text-slate-800 flex items-center justify-center font-bold text-lg">
                L3
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#263449]">Data Hero</h3>
                <p className="text-xs text-slate-500 mt-1">Analitik instan dan dashboard eksekutif.</p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li className="flex items-center gap-2">✓ PivotTable & PivotChart 3 Detik</li>
                <li className="flex items-center gap-2">✓ Conditional Formatting Otomatis</li>
                <li className="flex items-center gap-2">✓ Data Validation & Dropdown Menu</li>
                <li className="flex items-center gap-2">✓ Desain Mini Dashboard Penjualan</li>
                <li className="flex items-center gap-2">✓ Capstone Project Dunia Nyata</li>
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('learning-path')}
              className="mt-6 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>Buka Data Hero</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Daily Quest & Project Lab Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Daily Quest Teaser */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F8DCE9] shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                    <Flame className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#263449] text-lg">Daily Quest</h3>
                    <div className="text-xs text-slate-500">Misi Harian & Asah Otak</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-pink-700 bg-pink-100 px-2.5 py-1 rounded-full">
                  +150 XP Hari Ini
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bangun kebiasaan belajar setiap hari! Jawab kuis pilihan ganda dan selesaikan tantangan mengetik rumus langsung. Salah menjawab? Tenang, kamu akan diberi tahu letak kesalahannya dengan ramah dan bisa mencoba soal serupa!
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Misi Aktif Hari Ini:</div>
                <div className="text-xs font-semibold text-slate-800">
                  "Kasir Warung Kopi: Hitung total bayar pesanan dengan perkalian referensi sel."
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('daily-quest')}
              className="mt-6 w-full py-3 bg-[#263449] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Mulai Daily Quest Hari Ini</span>
              <ArrowRight className="w-3.5 h-3.5 text-pink-300" />
            </button>
          </div>

          {/* Project Lab Teaser */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#DDECFF] shadow-xs flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#263449] text-lg">Project Lab</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kerjakan 6 proyek studi kasus nyata: Budget Bulanan Pribadi, Laporan Penjualan Toko, Stok Gudang, Absensi Karyawan, Arus Kasir, dan Dashboard Penjualan dengan automated rubric penilaian.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Budgeting</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Stok Otomatis</span>
                  <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Dashboard KPI</span>
                </div>
              </div>
              <div className="sm:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                  <img
                    src={projectPreviewImg}
                    alt="Preview Proyek ExcelQuest"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('project-lab')}
              className="mt-6 w-full py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Jelajahi 6 Studi Kasus Project Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
