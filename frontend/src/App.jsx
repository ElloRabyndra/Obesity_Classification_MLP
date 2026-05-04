import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import Footer from './components/Footer';
import { predictObesity } from './lib/api';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await predictObesity(data);
      setResult(response);
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <HeroSection />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg max-w-4xl mx-auto flex items-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {!result ? (
            <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
          ) : (
            <PredictionResult result={result} onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
