import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { FileDown, LayoutTemplate, Moon, Sun } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    github: '',
    education: [],
    coursework: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const handleDownloadPdf = () => {
    // For true ATS compliance, the PDF MUST contain highlightable, parsable text.
    // Client-side libraries like html2pdf convert the DOM to a canvas image, which ATS bots cannot read.
    // Using the browser's native print engine (Save as PDF) is the industry standard for client-side text PDFs.
    window.print();
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-slate-50/80 to-white text-slate-900'}`}>
      
      {/* Navbar */}
      <nav className={`${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/70 border-slate-200/60'} backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Smart Resume Logo" className="h-10 w-10 object-contain rounded-xl shadow-sm border border-slate-200/50 bg-white" />
              <span className={`font-black text-2xl tracking-tight bg-gradient-to-r ${darkMode ? 'from-indigo-400 to-cyan-400' : 'from-indigo-600 to-cyan-600'} bg-clip-text text-transparent`}>
                Smart Resume
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-slate-600'}`}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FileDown size={18} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="flex-grow w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-5 xl:col-span-4 h-full">
            <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2 custom-scrollbar">
              <ResumeForm 
                resumeData={resumeData} 
                setResumeData={setResumeData} 
                darkMode={darkMode}
              />
            </div>
          </div>
          
          {/* Right Column - Preview */}
          <div className={`lg:col-span-7 xl:col-span-8 rounded-2xl p-4 sm:p-8 flex justify-center items-start min-h-[800px] overflow-auto transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-gray-200/50'}`}>
            {/* The resume preview itself stays light/white to match real paper and ATS formats */}
            <ResumePreview resumeData={resumeData} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
