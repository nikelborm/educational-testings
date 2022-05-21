import {
  LockOutlined,
  MailOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { AuthFormSubmitButton, CenteredAuthFormHeader } from 'components';
import { useRegistrationMutation } from 'hooks';
import { Link } from 'react-router-dom';

export function Registration() {
  const [form] = Form.useForm();
  const { sendRegistrationQuery } = useRegistrationMutation();
  const onFinishCreationFailed = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    message.error('Submit failed!');
  };
  return (
    <>
      <CenteredAuthFormHeader>Registration</CenteredAuthFormHeader>
      <Form
        form={form}
        layout="vertical"
        onFinish={sendRegistrationQuery}
        onFinishFailed={onFinishCreationFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: 'email' },
            { type: 'string', min: 7, required: true },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="user@mail.ru"
            spellCheck={false}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            { type: 'string', min: 8 },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="***********"
            spellCheck={false}
          />
        </Form.Item>
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
        <AuthFormSubmitButton
          buttonText="Create account"
          link={<Link to="/auth/login">enter your account!</Link>}
        />
      </Form>
    </>
  );
}
