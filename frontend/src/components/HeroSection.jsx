import React from 'react';
import { Activity } from 'lucide-react';
const HeroSection = () => {
  return (
    <section className="bg-white border-b border-slate-200 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-brand-50 rounded-2xl">
            <Activity className="w-12 h-12 text-brand-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Prediksi Tingkat Obesitas
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Aplikasi berbasis Jaringan Syaraf Tiruan (MLP) untuk memprediksi tingkat obesitas berdasarkan data fisik dan gaya hidup Anda.
        </p>
        <button 
          onClick={() => document.getElementById('prediction-form').scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
        >
          Mulai Prediksi
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
