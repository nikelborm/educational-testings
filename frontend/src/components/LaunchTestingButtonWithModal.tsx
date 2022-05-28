import { Button, Form, Modal, Select } from 'antd';
import {
  useAvailableToLaunchAbstractTestings,
  useLaunchTestingMutation,
} from 'hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSession } from 'utils';
import { EducationalSpaceAccessScopeType } from 'backendTypes';

export function LaunchTestingButtonWithModal() {
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);
  const session = useSession();

  const educationalSpaceId = parseInt(searchParams.get('id') as string, 10);

  const canUserLaunchTestings =
    session.isAuthed &&
    session.accessToken.payload.user.userGroups.some(
      ({ educationalSpaceAccessScopes, educationalSpaceId: id }) =>
        id === educationalSpaceId &&
        educationalSpaceAccessScopes.some(
          (scope) =>
            scope.type ===
            EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
        ),
    );

  const { refetch, abstractTestings } =
    useAvailableToLaunchAbstractTestings(educationalSpaceId);

  useEffect(() => {
    if (visible) void refetch();
  }, [visible]);

  const { sendLaunchTestingQuery, isLoading } = useLaunchTestingMutation(() =>
    setVisible(false),
  );

  const [form] = Form.useForm();

  const handleOk = () => {
    console.log(
      'form.getFieldValue("abstractTestingId"): ',
      form.getFieldValue('abstractTestingId'),
    );
    console.log(
      'form.getFieldValue("abstractTestingId"): ',
      form.getFieldValue('abstractTestingId'),
    );
    // sendLaunchTestingQuery({
    //   educationalSpaceId,
    //   accessScopes: [],
    //   abstractTestingId: form.getFieldValue('abstractTestingId'),
    // });
  };

  if (canUserLaunchTestings)
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          Launch Testing
        </Button>
        <Modal
          title="Launch Testing"
          visible={visible}
          okText="Launch"
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
              name="abstractTestingId"
              label="Abstract testing to launch"
              rules={[{ required: true }]}
            >
              <Select style={{ width: '100%' }} loading>
                {abstractTestings?.map(({ id, name, description }) => (
                  <Select.Option key={id} value={id} title={description}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  return null;
}
