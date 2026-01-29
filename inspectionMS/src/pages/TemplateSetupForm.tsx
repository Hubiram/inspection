import React from 'react';
import DynamicFormWizard, { type Schema } from '../components/DynamicFormWizard';
import schemaData from '../schemas/templateSchema.json';

const TemplateSetupForm: React.FC = () => {
  const schema: Schema = schemaData as Schema;

  return (
    <div style={{ backgroundColor: "#2a2a2a", color: "#ffffff", padding: "20px" }}>
      <h2>Template Setup</h2>
      <DynamicFormWizard
        schema={schema}
      />
    </div>
  );
};

export default TemplateSetupForm;