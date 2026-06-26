import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto py-6 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="text-lg font-semibold text-slate-100">Mansi Singh</p>
          <span className="hidden sm:inline text-slate-600">|</span>
          <a href="mailto:mansisingh.gita@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            mansisingh.gita@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
