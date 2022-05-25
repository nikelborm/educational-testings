import { Button, Form, Input, Modal } from 'antd';
import { useCreateEducationalSpaceMutation } from 'hooks';
import { useState } from 'react';
import { useSession } from 'utils';

export function CreateEducationalSpaceButtonWithModal() {
  const session = useSession();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { sendCreateEducationalSpaceQuery, isLoading } =
    useCreateEducationalSpaceMutation(() => {
      setVisible(false);
    });

  const handleOk = () => {
    sendCreateEducationalSpaceQuery({
      name: form.getFieldValue('name'),
      description: form.getFieldValue('description'),
    });
  };

  if (
    session.isAuthed &&
    session.accessToken.payload.user.canCreateEducationalSpaces
  )
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          Create Educational Space
        </Button>
        <Modal
          title="Create Educational Space"
          visible={visible}
          okText="Create"
          onOk={handleOk}
          confirmLoading={isLoading}
          onCancel={() => setVisible(false)}
        >
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            initialValues={{ remember: false }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ type: 'string', min: 2, required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ type: 'string', min: 2, required: false }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  return null;
}
