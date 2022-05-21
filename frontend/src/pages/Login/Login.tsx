import { useLoginMutation } from 'hooks';
import { Form, message, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { AuthFormSubmitButton, CenteredAuthFormHeader } from 'components';
import { Link } from 'react-router-dom';

export function Login() {
  const [form] = Form.useForm();
  const { sendLoginQuery } = useLoginMutation();
  const onFinishCreationFailed = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    message.error('Submit failed!');
  };
  return (
    <>
      <CenteredAuthFormHeader>Login</CenteredAuthFormHeader>
      <Form
        form={form}
        layout="vertical"
        onFinish={sendLoginQuery}
        onFinishFailed={onFinishCreationFailed}
        autoComplete="on"
        initialValues={{ remember: true }}
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
        <AuthFormSubmitButton
          buttonText="Log in"
          link={<Link to="/auth/registration">create an account now!</Link>}
        />
      </Form>
    </>
  );
}
