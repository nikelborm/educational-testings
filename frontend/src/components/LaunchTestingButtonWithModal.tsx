import { Button, Checkbox, Form, Modal, Select, Table } from 'antd';
import {
  useAvailableToLaunchAbstractTestings,
  useIdSearchParam,
  useLaunchTestingMutation,
} from 'hooks';
import { useEffect, useState } from 'react';
import { useSession } from 'utils';
import {
  EducationalSpaceAccessScopeType,
  LaunchedTestingAccessScopeType,
  LaunchTestingAccessScopeDTO,
  UserGroupManagementAccessScopeType,
} from 'backendTypes';
import { RoutesEnum } from 'types';

export function LaunchTestingButtonWithModal() {
  const [visible, setVisible] = useState(false);
  const session = useSession();

  const educationalSpaceId = useIdSearchParam(RoutesEnum.MY_EDUCATIONAL_SPACES);

  const canUserLaunchTestings =
    session.isAuthed &&
    session.accessToken.payload.user.userGroups.some(
      ({
        educationalSpaceAccessScopes,
        leaderInAccessScopes,
        educationalSpaceId: id,
      }) =>
        id === educationalSpaceId &&
        (educationalSpaceAccessScopes.some(
          (scope) =>
            scope.type ===
            EducationalSpaceAccessScopeType.MODIFY_LAUNCHED_TESTINGS,
        ) ||
          leaderInAccessScopes.some(
            (scope) =>
              scope.type === UserGroupManagementAccessScopeType.LAUNCH_TESTING,
          )),
    );

  const {
    refetch,
    abstractTestings,
    userGroups,
    isLoading: doesAvailableToLaunchLoading,
  } = useAvailableToLaunchAbstractTestings(educationalSpaceId);

  useEffect(() => {
    if (visible) void refetch();
  }, [visible]);

  const { sendLaunchTestingQuery, isLoading } = useLaunchTestingMutation(() =>
    setVisible(false),
  );

  const [form] = Form.useForm();

  const handleOk = () => {
    const accessScopes: LaunchTestingAccessScopeDTO[] = [];

    const types = Object.values(LaunchedTestingAccessScopeType);

    userGroups?.forEach(({ id }) =>
      types.forEach((type) => {
        const value = form.getFieldValue(`${id}_${type}`);
        if (value) accessScopes.push({ type, userGroupId: id });
      }),
    );
    const payload = {
      educationalSpaceId,
      accessScopes,
      abstractTestingId: form.getFieldValue('abstractTestingId'),
    };
    console.log(payload);
    sendLaunchTestingQuery(payload);
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
          width="900px"
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
              <Select
                style={{ width: '100%' }}
                loading={doesAvailableToLaunchLoading}
              >
                {abstractTestings?.map(({ id, name, description }) => (
                  <Select.Option key={id} value={id} title={description}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            Access of user groups in this testing:
            <Table
              tableLayout="fixed"
              dataSource={userGroups?.map((space) => ({
                ...space,
                key: space.id,
              }))}
              pagination={false}
              style={{ marginTop: '24px' }}
              columns={[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                  width: '60%',
                },
                {
                  title: 'Can make attempts',
                  key: LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
                  width: '20%',
                  render: (_, data) => (
                    <Form.Item
                      name={`${data.id}_${LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS}`}
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox>Yes</Checkbox>
                    </Form.Item>
                  ),
                },
                {
                  title: 'Can view analytics',
                  key: LaunchedTestingAccessScopeType.VIEW_ANALYTICS,
                  width: '20%',
                  render: (_, data) => (
                    <Form.Item
                      name={`${data.id}_${LaunchedTestingAccessScopeType.VIEW_ANALYTICS}`}
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox>Yes</Checkbox>
                    </Form.Item>
                  ),
                },
              ]}
            />
          </Form>
        </Modal>
      </>
    );
  return null;
}
