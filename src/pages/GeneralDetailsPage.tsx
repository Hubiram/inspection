import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import DynamicFormWizard, { type Schema } from '../components/DynamicFormWizard';
import schemaData from '../schemas/generalDetailsSchema.json';

const GeneralDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const schema: Schema = schemaData as Schema;

  return (
    <div style={{ backgroundColor: "#2a2a2a", color: "#ffffff", padding: "20px" }}>
      <h2>General Details</h2>
      <DynamicFormWizard
        schema={schema}
      />
      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <Button type="primary" onClick={() => navigate('/inspection-list')}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default GeneralDetailsPage;
