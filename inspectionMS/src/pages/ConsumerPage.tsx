import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsumerPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Dummy data for regions and templates
  const regions = ['North', 'South', 'East', 'West'];
  const templates = ['Template1', 'Template2', 'Template3'];

  const handleNext = () => {
    console.log('Next clicked', { selectedRegion, selectedTemplate });
    navigate('/general-details');
  };

  return (
    <div style={{ backgroundColor: "#2a2a2a", color: "#ffffff", padding: "20px" }}>
      <h2>Consumer Page</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Region:</label>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">Select</option>
          {regions.map(region => <option key={region} value={region}>{region}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Template:</label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="">Select</option>
          {templates.map(template => <option key={template} value={template}>{template}</option>)}
        </select>
      </div>
      <button
        onClick={handleNext}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
};

export default ConsumerPage;
