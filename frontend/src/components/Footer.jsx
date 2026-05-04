import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-4 md:mb-0">
            <p className="text-sm text-slate-500 text-center md:text-left">
               Web Prediksi Obesitas
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-slate-500 text-center md:text-right">
              &copy; {new Date().getFullYear()} Dibuat oleh Kelompok 3
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
