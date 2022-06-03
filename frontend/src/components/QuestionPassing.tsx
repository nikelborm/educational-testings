import { Form, Radio } from 'antd';
import {
  AbstractQuestionChoiceType,
  AbstractTestingForPassingDTO,
} from 'backendTypes';
import { sortByStringField } from 'utils';
import { Fieldset } from './Fieldset';
import { Legend } from './Legend';

export function QuestionPassing({
  question,
  index,
}: {
  question: AbstractTestingForPassingDTO['stages'][0]['questions'][0];
  index: number;
}) {
  return (
    <Fieldset>
      <Legend>Вопрос №{index}</Legend>
      <Form.Item
        name={question.id}
        tooltip={question.description}
        label={question.name}
        rules={[
          { required: question.isRequired, message: 'Это обязательный вопрос' },
        ]}
      >
        {question.answerChoiceType ===
          AbstractQuestionChoiceType.SINGLE_CHOICE && (
          <Radio.Group>
            {sortByStringField('answer', question.abstractAnswerOptions).map(
              (answerOption) => (
                <Radio key={answerOption.id} value={answerOption.id}>
                  {answerOption.answer}
                </Radio>
              ),
            )}
          </Radio.Group>
        )}
      </Form.Item>
    </Fieldset>
  );
}
