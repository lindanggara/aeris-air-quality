import React, { useState, useEffect } from 'react';
import CardPredict from './components/CardPredict';

function App() {
  // State untuk menyimpan data kualitas udara (Sementara pakai dummy data dulu)
  const [airData, setAirData] = useState({
    city: "Surabaya",
    current_status: "NORMAL", // Hasil dari Isolation Forest
    pollutants: {
      pm25: 24.5,
      pm10: 42.1,
      co: 0.8
    },
    // Data prediksi per segmen waktu dari 15 model PyCaret Linda
    predictions: {
      pagi: { pm25: 22.1, pm10: 38.5, co: 0.6, status: "NORMAL" },
      siang: { pm25: 45.8, pm10: 55.2, co: 1.2, status: "ANOMALI" },
      sore_malam: { pm25: 28.4, pm10: 44.0, co: 0.9, status: "NORMAL" }
    }
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header Dashboard */}
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-teal-400">AERIS Dashboard</h1>
        <p className="text-slate-400">Sistem Deteksi Anomali Kualitas Udara Kota {airData.city}</p>
      </header>

      {/* Ringkasan Status Utama */}
      <div className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-slate-400">Status Kualitas Udara Saat Ini</h2>
          <p className="text-sm text-slate-500">Berdasarkan Model Isolation Forest</p>
        </div>
        <span className={`px-6 py-2 rounded-full font-bold text-lg ${
          airData.current_status === "NORMAL" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
        }`}>
          {airData.current_status}
        </span>
      </div>

      {/* Bagian Komponen Kerjaannya Intan: Segmentasi Waktu Prediktif */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-slate-300">Prediksi Polutan Berdasarkan Segmentasi Waktu</h2>
        <CardPredict data={airData.predictions} />
      </section>
    </div>
  );
}

export default App;