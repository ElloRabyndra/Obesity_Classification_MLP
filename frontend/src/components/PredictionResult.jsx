import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';

const kelasDeskripsi = {
  'Insufficient_Weight': 'Kekurangan Berat Badan (Kurus). Konsumsi kalori lebih rendah dari kebutuhan dasar tubuh.',
  'Normal_Weight': 'Berat Badan Normal. Indeks Massa Tubuh (IMT) berada dalam rentang sehat.',
  'Overweight_Level_I': 'Kelebihan Berat Badan Tingkat I. Terdapat sedikit kelebihan lemak tubuh.',
  'Overweight_Level_II': 'Kelebihan Berat Badan Tingkat II. Risiko gangguan kesehatan mulai meningkat.',
  'Obesity_Type_I': 'Obesitas Tipe I (Risiko Rendah). Lemak tubuh berlebih yang signifikan.',
  'Obesity_Type_II': 'Obesitas Tipe II (Risiko Sedang). Kondisi obesitas yang perlu perhatian medis.',
  'Obesity_Type_III': 'Obesitas Tipe III (Risiko Tinggi/Ekstrem). Kondisi obesitas parah dengan risiko komplikasi tinggi.'
};

const formatLabel = (label) => label.replace(/_/g, ' ');

const PredictionResult = ({ result, onReset }) => {
  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  if (!result) return null;

  // Urutkan probabilitas dari yang terbesar
  const sortedProbabilities = Object.entries(result.probabilitas)
    .sort(([, a], [, b]) => b - a);

  return (
    <div ref={resultRef} className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 text-center border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-medium text-slate-500 mb-2">Hasil Prediksi</h2>
        <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-4">
          {formatLabel(result.kelas)}
        </div>
        <p className="text-slate-600 max-w-lg mx-auto">
          {kelasDeskripsi[result.kelas] || 'Deskripsi tidak tersedia.'}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Probabilitas Per Kelas</h3>
        <div className="space-y-4">
          {sortedProbabilities.map(([className, prob]) => {
            const percentage = (prob * 100).toFixed(1);
            const isHighest = className === result.kelas;
            
            return (
              <div key={className} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className={`font-medium ${isHighest ? 'text-brand-700' : 'text-slate-600'}`}>
                    {formatLabel(className)}
                  </span>
                  <span className={`font-medium ${isHighest ? 'text-brand-700' : 'text-slate-500'}`}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${isHighest ? 'bg-brand-500' : 'bg-slate-300'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex items-start gap-3 p-4 bg-amber-50 text-amber-800 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Disclaimer:</strong> Hasil prediksi ini hanya untuk tujuan edukasi dan tidak dapat menggantikan diagnosis medis profesional. Konsultasikan dengan dokter untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={onReset}
            className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            Prediksi Ulang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
