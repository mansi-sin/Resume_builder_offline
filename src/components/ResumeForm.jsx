import React, { useState } from 'react';
import { User, Mail, Phone, Link, GraduationCap, Wrench, FolderGit2, Plus, Trash2, Award, BookOpen, FileText, Sparkles } from 'lucide-react';

const presetSummaries = {
  "Full Stack Developer": "Versatile Full Stack Developer with experience building scalable web applications using modern JavaScript frameworks, Node.js, and SQL/NoSQL databases. Passionate about writing clean, maintainable code and optimizing application performance across the entire frontend and backend lifecycle.",
  "Data Analyst": "Detail-oriented Data Analyst skilled in transforming raw data into actionable business insights using SQL, Python, and data visualization tools like Tableau and Power BI. Proven track record of identifying trends, optimizing processes, and supporting data-driven strategic decisions.",
  "Graphic Designer": "Creative Graphic Designer with a strong eye for visual storytelling, branding, and digital typography. Expert in Adobe Creative Cloud and Figma, delivering compelling visual assets for web, marketing campaigns, and brand identity design.",
  "Software Engineer": "Results-driven Software Engineer experienced in designing, developing, and deploying robust software solutions. Proficient in object-oriented programming, data structures, and agile methodologies, with a focus on system reliability and scalability.",
  "UI/UX Designer": "User-centric UI/UX Designer dedicated to creating intuitive, visually stunning digital experiences. Proficient in wireframing, interactive prototyping in Figma, and conducting thorough user research to solve complex usability challenges.",
  "Project Manager": "Dynamic Project Manager with a proven ability to lead cross-functional technical teams and deliver complex projects on time and within budget. Expert in Agile/Scrum methodologies, stakeholder communication, and strategic risk management."
};

// Basic Text Input Component with Validation Support
const InputField = ({ icon: Icon, label, name, type = 'text', value, onChange, placeholder, darkMode, pattern, errorMessage, maxLength }) => {
  const [touched, React_setTouched] = React.useState(false);
  const isFailing = touched && pattern && value && !new RegExp(pattern).test(value);
  const isSuccess = pattern && value && new RegExp(pattern).test(value);

  return (
    <div className="mb-4">
      <label className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-colors group-focus-within:text-blue-500">
          <Icon className={`h-5 w-5 transition-colors ${isFailing ? 'text-red-500' : isSuccess ? 'text-blue-500' : darkMode ? 'text-slate-500' : 'text-slate-500'} group-focus-within:text-blue-500`} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
            if (isFailing) React_setTouched(false); // Reset error state on typing
          }}
          onBlur={() => React_setTouched(true)}
          maxLength={maxLength}
          className={`focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm rounded-xl py-3 border outline-none transition-all duration-300 ${darkMode
              ? 'bg-slate-900/60 text-white placeholder-slate-500 hover:border-slate-600 ' + (isFailing ? 'border-red-500 ring-1 ring-red-500' : isSuccess ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-slate-700/80')
              : 'bg-white/60 backdrop-blur-sm text-slate-900 placeholder-slate-400 hover:border-indigo-300 hover:bg-white focus:bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] ' + (isFailing ? 'border-red-500 ring-1 ring-red-500 text-red-600' : isSuccess ? 'border-blue-500 ring-1 ring-blue-500/30 text-blue-700' : 'border-slate-200/80')
            }`}
          placeholder={placeholder}
        />
        {isFailing && errorMessage && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

const MonthYearPicker = ({ value, onChange, disabled, darkMode, focusRingClass = 'focus:ring-indigo-500' }) => {
  const parts = value ? value.split('-') : [];
  const year = parts[0] || '';
  const month = parts[1] || '';
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear + 5 - i).toString());

  const handleUpdate = (newYear, newMonth) => {
    if (!newYear && !newMonth) {
      onChange('');
    } else {
      onChange(`${newYear || ''}-${newMonth || ''}`);
    }
  };

  const selectClass = `w-1/2 p-3 text-sm appearance-none outline-none transition-all duration-300 cursor-pointer ${darkMode ? 'bg-slate-900/60 text-white border-slate-700 hover:border-slate-600' : 'bg-white/60 backdrop-blur-sm text-slate-900 border-slate-200/80 hover:border-indigo-300 hover:bg-white focus:bg-white'}`;

  return (
    <div className={`flex w-full rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-shadow focus-within:ring-2 focus-within:ring-offset-0 ${focusRingClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <select disabled={disabled} value={month} onChange={(e) => handleUpdate(year, e.target.value)} className={`${selectClass} rounded-l-xl border-y border-l border-r-0 text-center`}>
        <option value="" disabled>Month</option>
        {months.map((m, i) => <option key={m} value={m}>{monthNames[i]}</option>)}
      </select>
      <div className={`w-px z-10 ${darkMode ? 'bg-slate-700' : 'bg-slate-200/80'}`}></div>
      <select disabled={disabled} value={year} onChange={(e) => handleUpdate(e.target.value, month)} className={`${selectClass} rounded-r-xl border-y border-r border-l-0 text-center`}>
        <option value="" disabled>Year</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
};

const ResumeForm = ({ resumeData, setResumeData, darkMode }) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState('Languages');
  const [newCoursework, setNewCoursework] = useState('');

  const categories = ['Languages', 'Frameworks', 'Databases', 'Tools', 'Design', 'Soft Skills'];

  const commonCoursework = ['DBMS', 'Operating System', 'Data Structures', 'Software Engineering', 'Software Testing', 'Algorithms', 'Computer Networks', 'Web Design', 'PHP'];

  // Expanded quick add skills categorized
  const commonSkills = [
    // Languages
    { cat: 'Languages', name: 'JavaScript' }, { cat: 'Languages', name: 'Python' }, { cat: 'Languages', name: 'C++' },
    { cat: 'Languages', name: 'Java' }, { cat: 'Languages', name: 'TypeScript' }, { cat: 'Languages', name: 'Go' },
    { cat: 'Languages', name: 'Rust' }, { cat: 'Languages', name: 'C#' }, { cat: 'Languages', name: 'Swift' },
    { cat: 'Languages', name: 'Kotlin' }, { cat: 'Languages', name: 'Ruby' }, { cat: 'Languages', name: 'PHP' },

    // Frameworks
    { cat: 'Frameworks', name: 'React' }, { cat: 'Frameworks', name: 'Node.js' }, { cat: 'Frameworks', name: 'Next.js' },
    { cat: 'Frameworks', name: 'Express' }, { cat: 'Frameworks', name: 'Angular' }, { cat: 'Frameworks', name: 'Vue.js' },
    { cat: 'Frameworks', name: 'Django' }, { cat: 'Frameworks', name: 'Spring Boot' }, { cat: 'Frameworks', name: 'Flask' },
    { cat: 'Frameworks', name: 'Tailwind CSS' }, { cat: 'Frameworks', name: 'Bootstrap' }, { cat: 'Frameworks', name: 'Laravel' },

    // Databases
    { cat: 'Databases', name: 'SQL' }, { cat: 'Databases', name: 'MongoDB' }, { cat: 'Databases', name: 'PostgreSQL' },
    { cat: 'Databases', name: 'MySQL' }, { cat: 'Databases', name: 'Redis' }, { cat: 'Databases', name: 'Firebase' },
    { cat: 'Databases', name: 'Oracle' }, { cat: 'Databases', name: 'Cassandra' }, { cat: 'Databases', name: 'DynamoDB' },

    // Tools
    { cat: 'Tools', name: 'Git' }, { cat: 'Tools', name: 'Docker' }, { cat: 'Tools', name: 'AWS' },
    { cat: 'Tools', name: 'Kubernetes' }, { cat: 'Tools', name: 'Linux' }, { cat: 'Tools', name: 'Jenkins' },
    { cat: 'Tools', name: 'GitHub Actions' }, { cat: 'Tools', name: 'Jira' }, { cat: 'Tools', name: 'Postman' },

    // Design
    { cat: 'Design', name: 'Figma' }, { cat: 'Design', name: 'Adobe XD' }, { cat: 'Design', name: 'Photoshop' },
    { cat: 'Design', name: 'Illustrator' }, { cat: 'Design', name: 'UI/UX Design' }, { cat: 'Design', name: 'Wireframing' },

    // Soft Skills
    { cat: 'Soft Skills', name: 'Leadership' }, { cat: 'Soft Skills', name: 'Communication' }, { cat: 'Soft Skills', name: 'Problem Solving' },
    { cat: 'Soft Skills', name: 'Teamwork' }, { cat: 'Soft Skills', name: 'Agile' }, { cat: 'Soft Skills', name: 'Time Management' }
  ];

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Strict character blocking for immediate feedback
    if (name === 'fullName') {
      value = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    setResumeData(prev => ({ ...prev, [name]: value }));
  };

  // --- Arrays Handlers ---
  const handleArrayChange = (e, index, field, arrayName) => {
    // Handling checkboxes
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const newArray = [...resumeData[arrayName]];
    newArray[index] = { ...newArray[index], [field]: val };

    // If present is checked, clear end date
    if (field === 'isPresent' && val) {
      newArray[index].endDate = '';
    }

    setResumeData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addArrayItem = (arrayName, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], { id: Date.now(), ...defaultItem }]
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    const newArray = [...resumeData[arrayName]];
    newArray.splice(index, 1);
    setResumeData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  // --- Skills Handlers ---
  const addSkill = (cat, skillName) => {
    const trimmed = skillName.trim();
    if (trimmed) {
      // Check if this exact skill name already exists
      const exists = resumeData.skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase());
      if (!exists) {
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, { id: Date.now(), category: cat, name: trimmed }] }));
        setNewSkill('');
      }
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  // --- Coursework Handlers ---
  const addCoursework = (course) => {
    const trimmed = course.trim();
    if (trimmed && !resumeData.coursework.includes(trimmed)) {
      setResumeData(prev => ({ ...prev, coursework: [...prev.coursework, trimmed] }));
      setNewCoursework('');
    }
  };

  const removeCoursework = (index) => {
    const newCw = [...resumeData.coursework];
    newCw.splice(index, 1);
    setResumeData(prev => ({ ...prev, coursework: newCw }));
  };

  // UI Theme Variables
  const formBg = darkMode ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-slate-900/50' : 'bg-white/80 backdrop-blur-2xl border-white/50 shadow-2xl shadow-indigo-500/5';
  const headingText = darkMode ? 'text-white' : 'text-slate-800';
  const sectionCardBg = darkMode ? 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600/80' : 'bg-white/50 backdrop-blur-md border-slate-200/60 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5';
  const inputBg = darkMode ? 'bg-slate-900/60 border-slate-700/80 text-white focus:border-blue-500' : 'bg-white/60 backdrop-blur-sm border-slate-200/80 hover:border-indigo-300 hover:bg-white focus:bg-white focus:border-blue-500 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)]';
  const sectionIconClass = darkMode ? 'bg-slate-800 border border-slate-700 text-slate-200 p-2.5 rounded-xl shadow-sm' : 'bg-slate-900 text-white p-2.5 rounded-xl shadow-sm';
  const addBtnClass = "flex items-center gap-1.5 text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 py-2 px-4 rounded-xl font-medium transition-all shadow-sm";

  return (
    <div className={`${formBg} p-6 sm:p-8 rounded-3xl border transition-all duration-500`}>

      {/* Header Profile Area */}
      <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
        <h2 className={`text-2xl font-bold flex items-center gap-3 mb-6 ${headingText}`}>
          <span className={sectionIconClass}>
            <User size={20} />
          </span>
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          <InputField
            icon={User} label="Full Name" name="fullName"
            value={resumeData.fullName} onChange={handleChange} placeholder="John Doe" darkMode={darkMode}
            pattern="^[A-Za-z\s]+$"
            errorMessage="Name must only contain letters and spaces"
          />
          <InputField
            icon={Mail} label="Email" name="email" type="email"
            value={resumeData.email} onChange={handleChange} placeholder="john@example.com" darkMode={darkMode}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            errorMessage="Please enter a valid email address"
          />
          <InputField
            icon={Phone} label="Phone" name="phone" type="tel"
            value={resumeData.phone} onChange={handleChange} placeholder="1234567890" darkMode={darkMode}
            pattern="^\d{10}$"
            errorMessage="Phone number must be exactly 10 digits"
          />
          <InputField
            icon={Link}
            label="LinkedIn Profile"
            name="linkedIn"
            value={resumeData.linkedIn}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
            darkMode={darkMode}
            pattern="^(https?:\/\/)?(www\.)?linkedin\.com\/.*$"
            errorMessage="Please enter a valid LinkedIn URL"
          />
          <InputField
            icon={FolderGit2}
            label="GitHub Profile"
            name="github"
            value={resumeData.github}
            onChange={handleChange}
            placeholder="github.com/username"
            darkMode={darkMode}
            pattern="^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+$"
            errorMessage="Please enter a valid GitHub URL"
          />
        </div>
      </div>

      {/* Professional Summary / Overview */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-3 ${headingText}`}>
            <span className={sectionIconClass}>
              <FileText size={20} />
            </span>
            Overview <span className="text-xs font-normal text-slate-400 dark:text-slate-500 ml-1">(Optional)</span>
          </h2>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-800/30 border-slate-700/60' : 'bg-slate-50/70 border-slate-200/80'}`}>
          <div className="mb-4">
            <p className={`text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-1.5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              <Sparkles size={14} /> Quick Generate Summary
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(presetSummaries).map(role => (
                <button
                  key={role}
                  onClick={(e) => {
                    e.preventDefault();
                    setResumeData(prev => ({ ...prev, summary: presetSummaries[role] }));
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all hover:scale-105 active:scale-95 ${
                    resumeData.summary === presetSummaries[role]
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : darkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-blue-500/50 hover:text-blue-400'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  + {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <textarea
              rows={4}
              value={resumeData.summary || ''}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Write a 3-4 line professional overview highlighting your core expertise, key achievements, and career goals... or click a role above to auto-generate one!"
              className={`w-full p-4 sm:text-sm rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 leading-relaxed ${inputBg}`}
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-3 ${headingText}`}>
            <span className={sectionIconClass}>
              <GraduationCap size={20} />
            </span>
            Education
          </h2>
          {resumeData.education.length < 2 && (
            <button
              onClick={() => addArrayItem('education', { school: '', degree: '', startDate: '', endDate: '', isPresent: false, cgpa: '', details: '' })}
              className={addBtnClass}
            >
              <Plus size={16} /> Add Education
            </button>
          )}
        </div>

        <div className="space-y-5">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className={`p-5 rounded-xl border transition-all duration-300 relative group ${sectionCardBg}`}>
              <button
                onClick={() => removeArrayItem(index, 'education')}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 p-1.5 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
              <h3 className={`font-bold text-sm mb-4 pb-2 border-b ${darkMode ? 'text-slate-300 border-slate-700/50' : 'text-slate-700 border-slate-200/60'}`}>
                {index === 0 ? "School / High School Details" : "College / University Details"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-10">
                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{index === 0 ? "Standard/Class" : "Degree/Course"}</label>
                  <input type="text" placeholder={index === 0 ? "e.g. 12th Grade Science" : "e.g. B.S. Computer Science"} value={edu.degree} onChange={(e) => handleArrayChange(e, index, 'degree', 'education')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${inputBg}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{index === 0 ? "School Name" : "College / University Name"}</label>
                  <input type="text" placeholder={index === 0 ? "e.g. Delhi Public School" : "e.g. MIT"} value={edu.school} onChange={(e) => handleArrayChange(e, index, 'school', 'education')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${inputBg}`} />
                </div>

                {/* Date Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:col-span-2">
                  <div>
                    <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Start Date</label>
                    <MonthYearPicker value={edu.startDate} onChange={(val) => handleArrayChange({ target: { value: val } }, index, 'startDate', 'education')} darkMode={darkMode} focusRingClass="focus:ring-indigo-500" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={`block text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>End Date</label>
                      <label className={`flex items-center gap-1.5 cursor-pointer text-[10px] uppercase font-bold px-2 py-0.5 rounded-full transition-colors ${edu.isPresent ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                        <input type="checkbox" checked={edu.isPresent} onChange={(e) => handleArrayChange(e, index, 'isPresent', 'education')} className="w-3 h-3 rounded text-indigo-600 focus:ring-indigo-500" />
                        Present
                      </label>
                    </div>
                    <MonthYearPicker disabled={edu.isPresent} value={edu.endDate} onChange={(val) => handleArrayChange({ target: { value: val } }, index, 'endDate', 'education')} darkMode={darkMode} focusRingClass="focus:ring-indigo-500" />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>CGPA</label>
                  <input type="text" placeholder="e.g. 3.8/4.0" value={edu.cgpa} onChange={(e) => handleArrayChange(e, index, 'cgpa', 'education')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow ${inputBg}`} />
                </div>
              </div>
              <textarea placeholder="Details (coursework, achievements, activities)" rows={2} value={edu.details} onChange={(e) => handleArrayChange(e, index, 'details', 'education')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-y ${inputBg}`} />
            </div>
          ))}
          {resumeData.education.length === 0 && <p className={`text-sm italic text-center p-4 rounded-lg border border-dashed ${darkMode ? 'border-slate-700 text-slate-500' : 'border-slate-300 text-slate-400'}`}>Click "Add Education" to list your academic history.</p>}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h2 className={`text-xl font-bold flex items-center gap-3 mb-6 ${headingText}`}>
          <span className={sectionIconClass}>
            <Wrench size={20} />
          </span>
          Skills
        </h2>

        <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800/30 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex overflow-x-auto gap-2 mb-4 pb-2 custom-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={(e) => { e.preventDefault(); setSkillCategory(cat); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${skillCategory === cat
                    ? 'bg-teal-600 text-white shadow-md'
                    : darkMode
                      ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-grow mb-4">
            <input
              type="text"
              placeholder={`Type a ${skillCategory} skill and press Enter`}
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillCategory, newSkill))}
              className={`flex-grow p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-teal-500 transition-shadow ${inputBg}`}
            />
            <button
              onClick={(e) => { e.preventDefault(); addSkill(skillCategory, newSkill); }}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium shadow-md shadow-teal-500/20"
            >
              Add
            </button>
          </div>

          <div className="mb-5">
            <p className={`text-xs uppercase tracking-wider font-semibold mb-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Quick Add {skillCategory}</p>
            <div className="flex flex-wrap gap-2">
              {commonSkills.filter(skill => skill.cat === skillCategory).map(skill => (
                <button
                  key={skill.name}
                  onClick={(e) => { e.preventDefault(); addSkill(skill.cat, skill.name); }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-teal-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-700'}`}
                >
                  + {skill.name}
                </button>
              ))}
              {commonSkills.filter(skill => skill.cat === skillCategory).length === 0 && (
                <span className={`text-xs italic ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>No suggestions for {skillCategory}.</span>
              )}
            </div>
          </div>

          <div className={`flex flex-col gap-3 p-4 min-h-[70px] rounded-xl border-2 border-dashed transition-colors ${darkMode ? 'border-slate-700/50 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'}`}>
            {categories.map(cat => {
              const catSkills = resumeData.skills.filter(s => s.category === cat);
              if (catSkills.length === 0) return null;
              return (
                <div key={cat} className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <span className={`text-xs font-bold uppercase w-24 pt-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cat}:</span>
                  <div className="flex flex-wrap gap-2 flex-grow">
                    {catSkills.map(skill => {
                      const globalIndex = resumeData.skills.findIndex(s => s.id === skill.id);
                      return (
                        <div key={skill.id} className="flex items-center gap-1.5 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 dark:from-teal-500/20 dark:to-emerald-500/20 border border-teal-200 dark:border-teal-500/30 text-teal-800 dark:text-teal-300 px-3 py-1.5 rounded-full text-sm font-medium group">
                          {skill.name}
                          <button onClick={() => removeSkill(globalIndex)} className="text-teal-600/50 dark:text-teal-400/50 hover:text-teal-800 dark:hover:text-teal-200 transition-colors bg-white/50 dark:bg-black/20 rounded-full p-0.5">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {resumeData.skills.length === 0 && <span className={`text-sm italic flex items-center justify-center w-full h-full ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Your added skills will appear here...</span>}
          </div>
        </div>
      </div>

      {/* Relevant Coursework */}
      <div className="mb-10">
        <h2 className={`text-xl font-bold flex items-center gap-3 mb-6 ${headingText}`}>
          <span className={sectionIconClass}>
            <BookOpen size={20} />
          </span>
          Relevant Coursework
        </h2>

        <div className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800/30 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex gap-2 flex-grow mb-4">
            <input
              type="text"
              placeholder="Type a course and press Enter"
              value={newCoursework}
              onChange={(e) => setNewCoursework(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCoursework(newCoursework))}
              className={`flex-grow p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-purple-500 transition-shadow ${inputBg}`}
            />
            <button
              onClick={(e) => { e.preventDefault(); addCoursework(newCoursework); }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium shadow-md shadow-purple-500/20"
            >
              Add
            </button>
          </div>

          <div className="mb-5">
            <p className={`text-xs uppercase tracking-wider font-semibold mb-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Quick Add Courses</p>
            <div className="flex flex-wrap gap-2">
              {commonCoursework.map(course => (
                <button
                  key={course}
                  onClick={(e) => { e.preventDefault(); addCoursework(course); }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-purple-500/50 hover:text-purple-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-700'}`}
                >
                  + {course}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex flex-wrap gap-2 p-4 min-h-[70px] rounded-xl border-2 border-dashed transition-colors ${darkMode ? 'border-slate-700/50 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'}`}>
            {resumeData.coursework && resumeData.coursework.map((course, index) => (
              <div key={course} className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 dark:from-purple-500/20 dark:to-fuchsia-500/20 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium group">
                {course}
                <button onClick={() => removeCoursework(index)} className="text-purple-600/50 dark:text-purple-400/50 hover:text-purple-800 dark:hover:text-purple-200 transition-colors bg-white/50 dark:bg-black/20 rounded-full p-0.5">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            {(!resumeData.coursework || resumeData.coursework.length === 0) && <span className={`text-sm italic flex items-center justify-center w-full h-full ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>Your added coursework will appear here...</span>}
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-3 ${headingText}`}>
            <span className={sectionIconClass}>
              <FolderGit2 size={20} />
            </span>
            Projects & Experience
          </h2>
          <button
            onClick={() => addArrayItem('projects', { title: '', startDate: '', endDate: '', isPresent: false, details: '' })}
            className={addBtnClass}
          >
            <Plus size={16} /> Add Project
          </button>
        </div>

        <div className="space-y-5">
          {resumeData.projects.map((proj, index) => (
            <div key={proj.id} className={`p-5 rounded-xl border transition-all duration-300 relative group ${sectionCardBg}`}>
              <button
                onClick={() => removeArrayItem(index, 'projects')}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 p-1.5 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 pr-10">
                <div className="sm:col-span-2">
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Project / Role Title</label>
                  <input type="text" placeholder="Title" value={proj.title} onChange={(e) => handleArrayChange(e, index, 'title', 'projects')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-rose-500 transition-shadow ${inputBg}`} />
                </div>

                {/* Date Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:col-span-2">
                  <div>
                    <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Start Date</label>
                    <MonthYearPicker value={proj.startDate} onChange={(val) => handleArrayChange({ target: { value: val } }, index, 'startDate', 'projects')} darkMode={darkMode} focusRingClass="focus:ring-rose-500" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={`block text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>End Date</label>
                      <label className={`flex items-center gap-1.5 cursor-pointer text-[10px] uppercase font-bold px-2 py-0.5 rounded-full transition-colors ${proj.isPresent ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                        <input type="checkbox" checked={proj.isPresent} onChange={(e) => handleArrayChange(e, index, 'isPresent', 'projects')} className="w-3 h-3 rounded text-rose-600 focus:ring-rose-500" />
                        Present
                      </label>
                    </div>
                    <MonthYearPicker disabled={proj.isPresent} value={proj.endDate} onChange={(val) => handleArrayChange({ target: { value: val } }, index, 'endDate', 'projects')} darkMode={darkMode} focusRingClass="focus:ring-rose-500" />
                  </div>
                </div>
              </div>
              <textarea placeholder="Description (bullet points recommended)" rows={3} value={proj.details} onChange={(e) => handleArrayChange(e, index, 'details', 'projects')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-rose-500 transition-shadow resize-y ${inputBg}`} />
            </div>
          ))}
          {resumeData.projects.length === 0 && <p className={`text-sm italic text-center p-4 rounded-lg border border-dashed ${darkMode ? 'border-slate-700 text-slate-500' : 'border-slate-300 text-slate-400'}`}>Click "Add Project" to detail your experience.</p>}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-3 ${headingText}`}>
            <span className={sectionIconClass}>
              <Award size={20} />
            </span>
            Certifications
          </h2>
          <button
            onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '', link: '' })}
            className={addBtnClass}
          >
            <Plus size={16} /> Add Cert
          </button>
        </div>

        <div className="space-y-5">
          {resumeData.certifications.map((cert, index) => (
            <div key={cert.id} className={`p-5 rounded-xl border transition-all duration-300 relative group ${sectionCardBg}`}>
              <button
                onClick={() => removeArrayItem(index, 'certifications')}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 p-1.5 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Certification Name</label>
                  <input type="text" placeholder="e.g. AWS Cloud Practitioner" value={cert.name} onChange={(e) => handleArrayChange(e, index, 'name', 'certifications')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-amber-500 transition-shadow ${inputBg}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Issuing Organization</label>
                  <input type="text" placeholder="e.g. Amazon Web Services" value={cert.issuer} onChange={(e) => handleArrayChange(e, index, 'issuer', 'certifications')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-amber-500 transition-shadow ${inputBg}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Date Earned</label>
                  <MonthYearPicker value={cert.date} onChange={(val) => handleArrayChange({ target: { value: val } }, index, 'date', 'certifications')} darkMode={darkMode} focusRingClass="focus:ring-amber-500" />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Link / Credential ID</label>
                  <input type="url" placeholder="https://..." value={cert.link} onChange={(e) => handleArrayChange(e, index, 'link', 'certifications')} className={`w-full p-2.5 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-amber-500 transition-shadow ${inputBg}`} />
                </div>
              </div>
            </div>
          ))}
          {resumeData.certifications.length === 0 && <p className={`text-sm italic text-center p-4 rounded-lg border border-dashed ${darkMode ? 'border-slate-700 text-slate-500' : 'border-slate-300 text-slate-400'}`}>Click "Add Cert" to list your certifications.</p>}
        </div>
      </div>

    </div>
  );
};

export default ResumeForm;
