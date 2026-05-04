import React from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

const PredictionForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      Gender: 'Male',
      Age: 25,
      Height: 1.70,
      Weight: 70,
      family_history_with_overweight: 'no',
      FAVC: 'no',
      FCVC: 2,
      NCP: 3,
      CAEC: 'Sometimes',
      SMOKE: 'no',
      CH2O: 2,
      SCC: 'no',
      FAF: 1,
      TUE: 1,
      CALC: 'no',
      MTRANS: 'Public_Transportation'
    }
  });

  const fcvcValue = watch('FCVC');
  const ncpValue = watch('NCP');
  const ch2oValue = watch('CH2O');
  const fafValue = watch('FAF');
  const tueValue = watch('TUE');

  return (
    <div id="prediction-form" className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">Form Data Prediksi</h2>
        <p className="text-slate-500 mt-1">Lengkapi data berikut untuk mengetahui prediksi tingkat obesitas.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-10">
        {/* DATA FISIK */}
        <section>
          <h3 className="text-lg font-semibold text-brand-700 mb-4 border-b border-slate-100 pb-2">1. Data Fisik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Kelamin</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="Male" {...register('Gender')} className="w-4 h-4 text-brand-600 border-slate-300 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Laki-laki</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="Female" {...register('Gender')} className="w-4 h-4 text-brand-600 border-slate-300 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Perempuan</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Umur (tahun)</label>
              <input type="number" step="1" min="1" max="120" {...register('Age', { required: true, valueAsNumber: true })} className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tinggi Badan (meter)</label>
              <input type="number" step="0.01" min="0.5" max="2.5" {...register('Height', { required: true, valueAsNumber: true })} className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors" placeholder="Contoh: 1.75" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Berat Badan (kg)</label>
              <input type="number" step="0.1" min="10" max="300" {...register('Weight', { required: true, valueAsNumber: true })} className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-colors" placeholder="Contoh: 70.5" />
            </div>
          </div>
        </section>

        {/* KEBIASAAN MAKAN */}
        <section>
          <h3 className="text-lg font-semibold text-brand-700 mb-4 border-b border-slate-100 pb-2">2. Kebiasaan Makan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sering Konsumsi Makanan Tinggi Kalori? (FAVC)</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="yes" {...register('FAVC')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Ya</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="no" {...register('FAVC')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Tidak</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Frekuensi Makan Sayur (FCVC): <span className="text-brand-600 font-semibold">{fcvcValue}</span></label>
              <input type="range" min="1" max="3" step="1" {...register('FCVC', { valueAsNumber: true })} className="w-full accent-brand-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Jarang (1)</span>
                <span>Selalu (3)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Jumlah Makan Utama per Hari (NCP): <span className="text-brand-600 font-semibold">{ncpValue}</span></label>
              <input type="range" min="1" max="4" step="1" {...register('NCP', { valueAsNumber: true })} className="w-full accent-brand-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1 Kali</span>
                <span>4 Kali</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Konsumsi Air Harian (CH2O): <span className="text-brand-600 font-semibold">{ch2oValue}</span></label>
              <input type="range" min="1" max="3" step="1" {...register('CH2O', { valueAsNumber: true })} className="w-full accent-brand-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Kurang (1)</span>
                <span>Banyak (3)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Makan di Luar Jam Makan Utama (CAEC)</label>
              <select {...register('CAEC')} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white">
                <option value="no">Tidak Pernah (no)</option>
                <option value="Sometimes">Kadang-kadang (Sometimes)</option>
                <option value="Frequently">Sering (Frequently)</option>
                <option value="Always">Selalu (Always)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Konsumsi Alkohol (CALC)</label>
              <select {...register('CALC')} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white">
                <option value="no">Tidak Pernah (no)</option>
                <option value="Sometimes">Kadang-kadang (Sometimes)</option>
                <option value="Frequently">Sering (Frequently)</option>
                <option value="Always">Selalu (Always)</option>
              </select>
            </div>
          </div>
        </section>

        {/* GAYA HIDUP */}
        <section>
          <h3 className="text-lg font-semibold text-brand-700 mb-4 border-b border-slate-100 pb-2">3. Gaya Hidup & Riwayat</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Riwayat Obesitas dalam Keluarga</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="yes" {...register('family_history_with_overweight')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Ya</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="no" {...register('family_history_with_overweight')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Tidak</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Merokok (SMOKE)</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="yes" {...register('SMOKE')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Ya</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="no" {...register('SMOKE')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Tidak</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Memantau Kalori Konsumsi (SCC)</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="yes" {...register('SCC')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Ya</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" value="no" {...register('SCC')} className="w-4 h-4 text-brand-600 focus:ring-brand-500" />
                  <span className="ml-2 text-slate-700">Tidak</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Frekuensi Olahraga / Minggu (FAF): <span className="text-brand-600 font-semibold">{fafValue}</span></label>
              <input type="range" min="0" max="3" step="1" {...register('FAF', { valueAsNumber: true })} className="w-full accent-brand-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Tidak Pernah (0)</span>
                <span>Sering (3)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Jam Penggunaan Perangkat (TUE): <span className="text-brand-600 font-semibold">{tueValue}</span></label>
              <input type="range" min="0" max="2" step="1" {...register('TUE', { valueAsNumber: true })} className="w-full accent-brand-600" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0-2 jam (0)</span>
                <span>&gt;5 jam (2)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Transportasi Utama (MTRANS)</label>
              <select {...register('MTRANS')} className="w-full rounded-lg border-slate-300 border px-4 py-2.5 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white">
                <option value="Automobile">Mobil Pribadi</option>
                <option value="Motorbike">Sepeda Motor</option>
                <option value="Bike">Sepeda</option>
                <option value="Public_Transportation">Transportasi Umum</option>
                <option value="Walking">Jalan Kaki</option>
              </select>
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-slate-200">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center transition-colors shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Memproses Prediksi...
              </>
            ) : (
              'Lihat Hasil Prediksi'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;
