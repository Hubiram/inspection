import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, Form, Checkbox, Select, Input } from 'antd';

const { Meta } = Card;

const inspectionTypes = [
  'Safety & Accessibility',
  'External Condition',
  'Leakage Check',
  'Operation & Function',
  'Stem, Bonnet & Packing',
  'Actuator/Operator',
];

const InspectionListPage: React.FC = () => {
  const [visibleModal, setVisibleModal] = useState<string | null>(null);
  const [form] = Form.useForm();

  const showModal = (type: string) => {
    setVisibleModal(type);
  };

  const handleCancel = () => {
    setVisibleModal(null);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <div style={{ backgroundColor: "#2a2a2a", color: "#ffffff", padding: "20px", minHeight: "100vh" }}>
      <h2>Inspection List</h2>
      <Row gutter={[16, 16]}>
        {inspectionTypes.map((type, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ backgroundColor: "#1a1a1a", borderColor: "#444", cursor: "pointer" }}
              onClick={() => showModal(type)}
            >
              <Meta
                title={<span style={{ color: "#ffffff" }}>{type}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>
      {inspectionTypes.map((type) => (
          <Modal
            open={visibleModal === type}
            onCancel={handleCancel}
            footer={null}
            title={null}
            //width={600}
            wrapClassName="dark-modal"
            bodyStyle={{ backgroundColor: '#2a2a2a', border: 'none' }}
          >
            <div style={{ backgroundColor: "#2a2a2a", color: "#ffffff", padding: "8px" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', margin: 0 }}>{`${type} Inspection Form`}</h3>
                <Button type="default" style={{ color: '#ffffff', borderColor: '#444', backgroundColor: '#1a1a1a' }} onClick={() => console.log('Export clicked')}>
                  Export
                </Button>
              </div>
              <Form form={form} layout="vertical" style={{ color: '#ffffff' }}>
                <Form.Item label={<span style={{ color: '#ffffff' }}>Is valve damaged?</span>} name="valveDamaged">
                  <Checkbox.Group options={['Yes', 'No']} style={{ color: '#ffffff' }} />
                </Form.Item>
                <Form.Item label={<span style={{ color: '#ffffff' }}>Should valve be replaced?</span>} name="valveReplaced">
                  <Checkbox.Group options={['Yes', 'No']} style={{ color: '#ffffff' }} />
                </Form.Item>
                <Form.Item label={<span style={{ color: '#ffffff' }}>Operational Status of Valve</span>} name="operationalStatus">
                  <Select placeholder="Select status" style={{ color: '#ffffff', backgroundColor: '#1a1a1a' }} dropdownStyle={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
                    <Select.Option value="operational" style={{ color: '#ffffff' }}>Operational</Select.Option>
                    <Select.Option value="non-operational" style={{ color: '#ffffff' }}>Non-Operational</Select.Option>
                    <Select.Option value="maintenance-required" style={{ color: '#ffffff' }}>Maintenance Required</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<span style={{ color: '#ffffff' }}>Summary of status of valve</span>} name="summary">
                  <Input.TextArea rows={4} placeholder="Enter summary" style={{ color: '#ffffff', backgroundColor: '#1a1a1a', borderColor: '#444' }} />
                </Form.Item>
              </Form>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button onClick={handleCancel} style={{ color: '#ffffff', borderColor: '#444', backgroundColor: '#1a1a1a' }}>
                  Cancel
                </Button>
                <div>
                  <Button type="default" style={{ color: '#ffffff', borderColor: '#444', backgroundColor: '#1a1a1a', marginRight: '10px' }}>
                    + Add Attachment
                  </Button>
                  <Button type="primary" onClick={handleSubmit} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
      ))}
    </div>
  );
};

export default InspectionListPage;
