import { Button, Checkbox, Form, message, Modal, Select, Table } from 'antd';
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
  const [selectedAbstractTestingId, setSelectedAbstractTestingId] = useState<
    number | undefined
  >();

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

  const handleOk = () =>
    void (async () => {
      await form.validateFields();
      const accessScopes: LaunchTestingAccessScopeDTO[] = [];

      const types = Object.values(LaunchedTestingAccessScopeType);

      userGroups?.forEach(({ id }) =>
        types.forEach((type) => {
          const value = form.getFieldValue(`${id}_${type}`);
          if (value) accessScopes.push({ type, userGroupId: id });
        }),
      );

      if (!accessScopes.length) {
        await message.error(
          'Вы должны указать как минимум одну галочку в таблице прав',
        );
        return;
      }

      sendLaunchTestingQuery({
        educationalSpaceId,
        accessScopes,
        abstractTestingId: form.getFieldValue('abstractTestingId'),
      });
    })();

  if (canUserLaunchTestings)
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          Запустить тестирование
        </Button>
        <Modal
          title="Запуск тестирования"
          visible={visible}
          okText="Запустить"
          cancelText="Отменить"
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
              label="Абстрактное тестирование для запуска"
              rules={[
                {
                  required: true,
                  message: 'Вы обязаны выбрать абстрактное тестирование',
                },
              ]}
            >
              <Select
                onSelect={(abstractTestingId: number) => {
                  setSelectedAbstractTestingId(abstractTestingId);
                }}
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
            {selectedAbstractTestingId !== void 0 && (
              <>
                <p style={{ marginTop: 40 }}>
                  Подключённые к тестированию модули аналитики
                </p>
                <Table
                  size="small"
                  dataSource={abstractTestings
                    ?.find(({ id }) => id === selectedAbstractTestingId)
                    ?.analyticsModules?.map((module) => ({
                      ...module,
                      key: module.id,
                    }))}
                  pagination={false}
                  columns={[
                    {
                      title: 'Название',
                      dataIndex: 'name',
                      key: 'name',
                      width: '40%',
                    },
                    {
                      title: 'Описание',
                      key: 'description',
                      dataIndex: 'description',
                      width: '60%',
                    },
                  ]}
                />
              </>
            )}
            <p style={{ marginTop: 40 }}>
              Доступ групп пользователей в этом тестировании:
            </p>
            <Table
              size="small"
              dataSource={userGroups?.map((space) => ({
                ...space,
                key: space.id,
              }))}
              pagination={false}
              columns={[
                {
                  title: 'Название',
                  dataIndex: 'name',
                  key: 'name',
                  width: '60%',
                },
                {
                  title: 'Может проходить',
                  key: LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
                  width: '20%',
                  render: (_, data) => (
                    <Form.Item
                      name={`${data.id}_${LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS}`}
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox>Да</Checkbox>
                    </Form.Item>
                  ),
                },
                {
                  title: 'Может смотреть общую аналитику',
                  key: LaunchedTestingAccessScopeType.VIEW_ANALYTICS,
                  width: '20%',
                  render: (_, data) => (
                    <Form.Item
                      name={`${data.id}_${LaunchedTestingAccessScopeType.VIEW_ANALYTICS}`}
                      valuePropName="checked"
                      initialValue={false}
                    >
                      <Checkbox>Да</Checkbox>
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
