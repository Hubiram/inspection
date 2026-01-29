/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, InputNumber, Select, Button, Row, Col, Upload, DatePicker } from 'antd';
import type { FormInstance, Rule } from 'antd/es/form';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

export interface FieldConfig {
  name: string;
  label: string;
  type: 'input' | 'inputNumber' | 'select' | 'textarea' | 'upload' | 'date';
  options?: string[];
  rules?: Rule[];
}

export interface Schema {
  fields: FieldConfig[];
  layout?: string[][];
}

interface DynamicFormWizardProps {
  schema: Schema;
  onFinish?: (values: Record<string, any>) => void;
}

export interface DynamicFormWizardRef {
  submit: () => void;
  reset: () => void;
}

const DynamicFormWizard = forwardRef<DynamicFormWizardRef, DynamicFormWizardProps>(({
  schema,
}, ref) => {
  const [form] = Form.useForm<FormInstance<Record<string, any>>>();

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
    },
    reset: () => {
      form.resetFields();
    },
  }));

  const renderField = (config: FieldConfig) => {
    switch (config.type) {
      case 'input':
        return <Input />;
      case 'inputNumber':
        return <InputNumber style={{ width: '100%' }} />;
      case 'select':
        return (
          <Select
            style={{ backgroundColor: '#1a1a1a', color: 'white' }}
            dropdownStyle={{ backgroundColor: '#1a1a1a' }}
          >
            {config.options?.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        );
      case 'textarea':
        return <TextArea rows={3} />;
      case 'upload':
        return (
          <Upload
            listType="picture"
            maxCount={1}
            accept="image/*"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>{config.label}</Button>
          </Upload>
        );
      case 'date':
        return <DatePicker style={{ width: '100%' }} />;
      default:
        return <Input />;
    }
  };

  const renderFormItems = () => {
    if (schema.layout) {
      return schema.layout.map((row, rowIndex) => {
        if (row.length === 3) {
          // Special case: three fields in one row - companyName left half, assignSalesman and region right half
          const companyNameConfig = schema.fields.find(f => f.name === row[0]);
          const assignSalesmanConfig = schema.fields.find(f => f.name === row[1]);
          const regionConfig = schema.fields.find(f => f.name === row[2]);
          if (!companyNameConfig || !assignSalesmanConfig || !regionConfig) return null;
          return (
            <Row key={`row-${rowIndex}`} gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={companyNameConfig.name}
                  label={companyNameConfig.label}
                  rules={companyNameConfig.rules}
                >
                  {renderField(companyNameConfig)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name={assignSalesmanConfig.name}
                      label={assignSalesmanConfig.label}
                      rules={assignSalesmanConfig.rules}
                    >
                      {renderField(assignSalesmanConfig)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={regionConfig.name}
                      label={regionConfig.label}
                      rules={regionConfig.rules}
                    >
                      {renderField(regionConfig)}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        } else if (row.length === 1) {
          const config = schema.fields.find(f => f.name === row[0]);
          if (!config) return null;
          return (
            <Form.Item
              key={config.name}
              name={config.name}
              label={config.type === 'upload' ? '' : config.label}
              rules={config.rules}
            >
              {renderField(config)}
            </Form.Item>
          );
        } else {
          return (
            <Row key={`row-${rowIndex}`} gutter={16}>
              {row.map(fieldName => {
                const config = schema.fields.find(f => f.name === fieldName);
                if (!config) return null;
                return (
                  <Col key={config.name} span={12}>
                    <Form.Item
                      name={config.name}
                      label={config.label}
                      rules={config.rules}
                    >
                      {renderField(config)}
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          );
        }
      });
    } else {
      return schema.fields.map((config) => (
        <Form.Item
          key={config.name}
          name={config.name}
          label={config.label}
          rules={config.rules}
        >
          {renderField(config)}
        </Form.Item>
      ));
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: '100%', margin: '0 auto' }}
    >
      {renderFormItems()}
      <Row gutter={16} justify="start">
        <Col>
          <Button type="primary" htmlType="submit">Save</Button>
        </Col>
        <Col>
          <Button onClick={() => form.resetFields()}>Clear</Button>
        </Col>
      </Row>
    </Form>
  );
});

export default DynamicFormWizard;
