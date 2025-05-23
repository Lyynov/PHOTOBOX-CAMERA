import React from 'react';
import './TemplateSelector.css';

const TemplateSelector = ({ templates, selectedTemplate, onSelect }) => {
  return (
    <div className="template-selector">
      <h3>Pilih Template</h3>
      <div className="templates-grid">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={`template-item ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => onSelect(template.id)}
          >
            <img src={template.url} alt={template.name} />
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;