import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './ResumePreview.css';

function ResumePreview() {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('resumeData');
    if (data) {
      setResumeData(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

  const handleDownloadPDF = () => {
    const element = document.querySelector('.resume-document');
    const opt = {
      margin: [0.5, 0.5],
      filename: `${resumeData?.personalInfo?.['Full Name']?.replace(/\s+/g, '_')}_Resume.pdf` || 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your resume...</p>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="error-container">
        <h2>No Resume Data Found</h2>
        <p>Please return to the resume builder to create your resume.</p>
        <button className="primary-button" onClick={() => navigate('/matchproresumebuilder')}>
          Go to Resume Builder
        </button>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h1>Resume Preview</h1>
        <div className="preview-actions">
          <button className="edit-button" onClick={() => navigate('/matchproresumebuilder')}>
            Edit Resume
          </button>
          <button className="download-button" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      </div>

      <div className="resume-document">
        <div className="resume-header">
          <h1>{personalInfo["Full Name"]}</h1>
          <div className="contact-info">
            {personalInfo.Email && <p><span className="icon">📧</span> {personalInfo.Email}</p>}
            {personalInfo.Phone && <p><span className="icon">📱</span> {personalInfo.Phone}</p>}
            {personalInfo.Location && <p><span className="icon">📍</span> {personalInfo.Location}</p>}
          </div>
        </div>

        {summary?.Summary && (
          <div className="resume-section">
            <h2>Professional Summary</h2>
            <p className="summary-content">{summary.Summary}</p>
          </div>
        )}

        {experience?.length > 0 && (
          <div className="resume-section">
            <h2>Work Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.Position}</h3>
                  <p className="company">{exp.Company}</p>
                  <p className="date">
                    {exp["Start Date"]} - {exp["End Date"]}
                  </p>
                </div>
                <p className="description">{exp.Description}</p>
              </div>
            ))}
          </div>
        )}

        {education?.length > 0 && (
          <div className="resume-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.School}</h3>
                <p className="degree">{edu.Degree} in {edu["Field of Study"]}</p>
                <p className="graduation-date">Graduated: {edu["Graduation Date"]}</p>
              </div>
            ))}
          </div>
        )}

        {skills?.skills && (
          <div className="resume-section">
            <h2>Skills</h2>
            <div className="skills-content">
              {skills.skills.split(',').map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
