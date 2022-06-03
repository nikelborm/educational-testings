import { Button, Form, Typography } from 'antd';
import { AbstractTestingForPassingDTO } from 'backendTypes';
import { sortByNumberField } from 'utils';
import { StagePassing } from './StagePassing';

export function TestingPassing({
  onFinish,
  stages,
  onFinishFailed,
}: {
  stages: AbstractTestingForPassingDTO['stages'];
  onFinish(userAnswers: Record<number, number>): void;
  onFinishFailed?(...args: any[]): void;
}) {
  const [form] = Form.useForm();
  return (
    <>
      <Typography.Title level={3} style={{ fontWeight: 'bold' }}>
        Прохождение тестирования
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: false }}
      >
        {sortByNumberField('order', stages).map((stage, index) => (
          <StagePassing key={stage.id} stage={stage} index={index + 1} />
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Посмотреть результаты
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
