import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeBuilder.css';

const sections = {
  personalInfo: {
    title: 'Personal Information',
    icon: '👤',
    fields: ['Full Name', 'Email', 'Phone', 'Location']
  },
  summary: {
    title: 'Professional Summary',
    icon: '📝',
    fields: ['Summary']
  },
  experience: {
    title: 'Work Experience',
    icon: '💼',
    fields: ['Company', 'Position', 'Start Date', 'End Date', 'Description']
  },
  education: {
    title: 'Education',
    icon: '🎓',
    fields: ['School', 'Degree', 'Field of Study', 'Graduation Date']
  },
  skills: {
    title: 'Skills',
    icon: '🔧',
    fields: ['Skills']
  }
};

function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [resumeData, setResumeData] = useState({
    personalInfo: {},
    summary: {},
    experience: [],
    education: [],
    skills: { skills: '' }
  });
  const navigate = useNavigate();

  const handleInputChange = (section, field, value, index = null) => {
    setResumeData(prev => {
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        if (!newArray[index]) {
          newArray[index] = {};
        }
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      }
      return {
        ...prev,
        [section]: { ...prev[section], [field]: value }
      };
    });
  };

  const addNewItem = (section) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], {}]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const renderFields = (section, fields, index = null) => {
    const data = Array.isArray(resumeData[section])
      ? (resumeData[section][index] || {})
      : resumeData[section];

    return fields.map(field => (
      <div key={`${field}-${index}`} className="form-field">
        <label htmlFor={`${field}-${index}`}>{field}</label>
        {field === 'Description' ? (
          <textarea
            id={`${field}-${index}`}
            value={data[field] || ''}
            onChange={(e) => handleInputChange(section, field, e.target.value, index)}
            placeholder={`Enter ${field.toLowerCase()}`}
          />
        ) : (
          <input
            type={field.includes('Date') ? 'date' : 'text'}
            id={`${field}-${index}`}
            value={data[field] || ''}
            onChange={(e) => handleInputChange(section, field, e.target.value, index)}
            placeholder={`Enter ${field.toLowerCase()}`}
          />
        )}
      </div>
    ));
  };

  const renderSection = () => {
    const { title, fields } = sections[activeSection];
    
    return (
      <div className="section-content">
        <h2>{title}</h2>
        {Array.isArray(resumeData[activeSection]) ? (
          <>
            {resumeData[activeSection].map((_, index) => (
              <div key={index} className="item-container">
                <div className="item-header">
                  <h3>Entry {index + 1}</h3>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(activeSection, index)}
                  >
                    Remove
                  </button>
                </div>
                {renderFields(activeSection, fields, index)}
              </div>
            ))}
            <button
              className="add-button"
              onClick={() => addNewItem(activeSection)}
            >
              Add {title}
            </button>
          </>
        ) : (
          renderFields(activeSection, fields)
        )}
      </div>
    );
  };

  const handlePreview = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    navigate('/resume-preview');
  };

  return (
    <div className="main-content">
      <div className="resume-builder">
        <div className="sidebar">
          {Object.entries(sections).map(([key, { title, icon }]) => (
            <button
              key={key}
              className={`sidebar-button ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              <span className="icon">{icon}</span>
              {title}
            </button>
          ))}
        </div>
        
        <div className="main-content">
          <div className="content-header">
            <div className="action-buttons">
              <button className="preview-button" onClick={handlePreview}>
                Preview Resume
              </button>
            </div>
          </div>
          
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
