import React from 'react';

const ResumePreview = ({ resumeData }) => {
  // Helper to format details text with simple bullet points if there are line breaks
  const formatDetails = (text) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return null;
    
    if (lines.length === 1 && !lines[0].trim().startsWith('-')) {
        return <p className="text-gray-800 text-sm mt-1">{lines[0]}</p>;
    }

    return (
      <ul className="list-disc list-outside ml-4 mt-1 text-sm text-gray-800 space-y-1">
        {lines.map((line, index) => {
          const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
          return <li key={index}>{cleanLine}</li>;
        })}
      </ul>
    );
  };

  // Helper to format YYYY-MM to Month YYYY (e.g., 2022-09 -> Sep 2022)
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === '-') return '';
    const parts = dateStr.split('-');
    if (parts.length !== 2) return dateStr;
    const [year, month] = parts;
    if (!year || !month) return year || ''; // If only year is selected, show year. If only month, show nothing yet.
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  const renderDateRange = (start, end, isPresent) => {
    if (!start && !end && !isPresent) return '';
    const startStr = formatDate(start) || 'N/A';
    const endStr = isPresent ? 'Present' : (formatDate(end) || 'N/A');
    return `${startStr} - ${endStr}`;
  };

  // Group skills by category
  const groupedSkills = resumeData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  return (
    <div 
      className="bg-white p-8 sm:p-12 shadow-2xl w-full max-w-[850px] mx-auto overflow-hidden text-black font-serif"
      id="resume-preview-content"
      style={{ minHeight: '1100px' }} // Standard ATS A4/Letter size approximation
    >
      {/* Header section (Centered, simple text) */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-black mb-2">
          {resumeData.fullName || 'YOUR NAME'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-sm text-gray-800">
          {resumeData.email && (
            <>
              <span>{resumeData.email}</span>
              {(resumeData.phone || resumeData.linkedIn) && <span className="text-gray-400">|</span>}
            </>
          )}
          {resumeData.phone && (
            <>
              <span>{resumeData.phone}</span>
              {resumeData.linkedIn && <span className="text-gray-400">|</span>}
            </>
          )}
          {resumeData.linkedIn && (
            <>
              <span>{resumeData.linkedIn}</span>
              {resumeData.github && <span className="text-gray-400">|</span>}
            </>
          )}
          {resumeData.github && (
            <span>{resumeData.github}</span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-6">
        
        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start font-bold text-black text-sm">
                    <span>{edu.school || 'School Name'}</span>
                    <span>{renderDateRange(edu.startDate, edu.endDate, edu.isPresent)}</span>
                  </div>
                  <div className="flex justify-between items-start italic text-gray-800 text-sm">
                    <span>{edu.degree || 'Degree/Course'}</span>
                    {edu.cgpa && <span>CGPA: {edu.cgpa}</span>}
                  </div>
                  {formatDetails(edu.details)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-3">
              Skills
            </h2>
            <ul className="text-sm text-gray-800 leading-relaxed list-disc list-outside ml-4">
              {Object.entries(groupedSkills).map(([category, skillsArray]) => (
                <li key={category}>
                  <span className="font-bold text-black">{category}:</span> {skillsArray.join(', ')}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Coursework Section */}
        {resumeData.coursework && resumeData.coursework.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-3">
              Relevant Coursework
            </h2>
            <ul className="text-sm text-gray-800 leading-relaxed grid grid-cols-3 gap-x-4 gap-y-1">
              {resumeData.coursework.map(course => (
                <li key={course} className="flex items-start">
                  <span className="mr-2 text-black font-bold text-lg leading-tight">•</span>
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects Section */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-3">
              Experience & Projects
            </h2>
            <div className="space-y-4">
              {resumeData.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-start font-bold text-black text-sm">
                    <span>{proj.title || 'Project/Role Title'}</span>
                    <span>{renderDateRange(proj.startDate, proj.endDate, proj.isPresent)}</span>
                  </div>
                  {formatDetails(proj.details)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-3">
              Certifications
            </h2>
            <div className="space-y-3">
              {resumeData.certifications.map(cert => (
                <div key={cert.id} className="text-sm">
                  <div className="flex justify-between items-start font-bold text-black">
                    <span>{cert.name || 'Certification Name'}</span>
                    <span>{formatDate(cert.date)}</span>
                  </div>
                  <div className="text-gray-800">
                    {cert.issuer && <span>{cert.issuer}</span>}
                    {cert.issuer && cert.link && <span className="mx-1">|</span>}
                    {cert.link && <span className="italic">{cert.link}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ResumePreview;
