import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Card, Space } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

interface Question {
  id: number;
  questionText: string;
  responseType: string;
  answer: string;
}

const QuestionsForm: React.FC = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, questionText: '', responseType: 'text', answer: '' }
  ]);
  const navigate = useNavigate();

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([...questions, { id: newId, questionText: '', responseType: 'text', answer: '' }]);
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: number, field: keyof Question, value: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const renderAnswerField = (question: Question) => {
    switch (question.responseType) {
      case 'text':
        return (
          <Form.Item label="Answer">
            <Input
              value={question.answer}
              onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
              placeholder="Enter answer"
            />
          </Form.Item>
        );
      case 'number':
        return (
          <Form.Item label="Answer">
            <InputNumber
              value={question.answer}
              onChange={(value) => updateQuestion(question.id, 'answer', value?.toString() || '')}
              style={{ width: '100%' }}
              placeholder="Enter number"
            />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item label="Answer">
            <Select
              value={question.answer}
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
              onChange={(value) => updateQuestion(question.id, "answer", value)}
              placeholder="Select answer"
            >
              <Option value="option1">True</Option>
              <Option value="option2">False</Option>
            </Select>
          </Form.Item>
        );
      case 'textarea':
        return (
          <Form.Item label="Answer">
            <TextArea
              value={question.answer}
              onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
              rows={3}
              placeholder="Enter answer"
            />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const onClear = () => {
    form.resetFields();
    setQuestions([{ id: 1, questionText: '', responseType: 'text', answer: '' }]);
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', padding: '20px', backgroundColor: "#2a2a2a", color: "#ffffff" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Questions Form</h2>
        <Button type="primary" onClick={() => navigate('/section')}>
          + Create new section
        </Button>
      </div>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="sections"
          label="Sections"
          rules={[{ required: true, message: 'Please select a section.' }]}
        >
          <Select
            placeholder="Select a section"
            style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}
            dropdownStyle={{ backgroundColor: '#2a2a2a' }}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Form.Item>

        {questions.map((question, index) => (
          <Card
            key={question.id}
            title={`Question ${index + 1}`}
            extra={
              questions.length > 1 ? (
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => removeQuestion(question.id)}
                  danger
                />
              ) : null
            }
            style={{
              marginBottom: '16px',
              backgroundColor: '#2a2a2a',
              color: '#ffffff',
            }}
            bodyStyle={{ padding: '8px' }}
            headStyle={{ backgroundColor: '#2a2a2a', color: '#ffffff', borderBottom: '1px solid #ddd' }}
          >
            <Form.Item
              label="Enter Question"
              rules={[{ required: true, message: 'Please enter the question.' }]}
            >
              <Input
                value={question.questionText}
                onChange={(e) => updateQuestion(question.id, 'questionText', e.target.value)}
                placeholder="Enter your question"
                style={{ backgroundColor: '#1a1a1a', color: 'white' }}
              />
            </Form.Item>
            <Form.Item
              label="Response Type"
              rules={[{ required: true, message: 'Please select response type.' }]}
            >
              <Select
                value={question.responseType}
                onChange={(value) => updateQuestion(question.id, 'responseType', value)}
                style={{ backgroundColor: '#2a2a2a', color: '#ffffff' }}
                dropdownStyle={{ backgroundColor: '#ffffff' }}
              >
                <Option value="text">Text</Option>
                <Option value="number">Number</Option>
                <Option value="select">Boolean</Option>
                <Option value="textarea">Textarea</Option>
              </Select>
            </Form.Item>
            {renderAnswerField(question)}
          </Card>
        ))}

        <Form.Item>
          <Button type="dashed" onClick={addQuestion} icon={<PlusOutlined />}>
            Add Question
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: 'left' }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={onClear}>
              Clear
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionsForm;
