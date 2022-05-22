import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input } from 'antd';
import { LoginFormFields } from './LoginFormFields';

export function RegistrationFormFields() {
  return (
    <>
      <LoginFormFields />
      <Form.Item
        name="firstName"
        label="First name"
        rules={[{ type: 'string', min: 2, required: true }]}
      >
        <Input placeholder="John" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={[{ type: 'string', min: 2, required: true }]}
      >
        <Input placeholder="Doe" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="patronymic"
        label="Patronymic"
        rules={[{ type: 'string', min: 2, required: true }]}
      >
        <Input placeholder="Sergeevich" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ type: 'string', required: true }]}
      >
        <Input placeholder="Female|Male|other" prefix={<SmileOutlined />} />
      </Form.Item>
      <Form.Item
        name="canCreateEducationalSpaces"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox>I want to create educational spaces</Checkbox>
      </Form.Item>
    </>
  );
}
