import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumePreview.css';

function ResumePreview() {
  const [resumeData, setResumeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('resumeData');
    if (data) {
      setResumeData(JSON.parse(data));
    }
  }, []);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h1>Resume Preview</h1>
        <div className="preview-actions">
          <button className="edit-button" onClick={() => navigate('/resume-builder')}>
            Edit Resume
          </button>
          <button className="download-button" onClick={() => window.print()}>
            Download PDF
          </button>
        </div>
      </div>

      <div className="resume-document">
        <div className="resume-header">
          <h1>{personalInfo["Full Name"]}</h1>
          <div className="contact-info">
            <p>{personalInfo.Email}</p>
            <p>{personalInfo.Phone}</p>
            <p>{personalInfo.Location}</p>
          </div>
        </div>

        <div className="resume-section">
          <h2>Professional Summary</h2>
          <p>{summary.Summary}</p>
        </div>

        {experience.length > 0 && (
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

        {education.length > 0 && (
          <div className="resume-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.School}</h3>
                <p>{edu.Degree} in {edu["Field of Study"]}</p>
                <p>Graduated: {edu["Graduation Date"]}</p>
              </div>
            ))}
          </div>
        )}

        {skills.skills && (
          <div className="resume-section">
            <h2>Skills</h2>
            <p>{skills.skills}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;
