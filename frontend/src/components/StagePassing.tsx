import { AbstractTestingForPassingDTO } from 'backendTypes';
import { sortByNumberField } from 'utils';
import { Fieldset } from './Fieldset';
import { Legend } from './Legend';
import { QuestionPassing } from './QuestionPassing';

export function StagePassing({
  stage,
  index,
}: {
  stage: AbstractTestingForPassingDTO['stages'][0];
  index: number;
}) {
  return (
    <Fieldset>
      <Legend>
        Этап №{index}: {stage.name}
      </Legend>
      {stage.description && <p>{stage.description}</p>}
      {sortByNumberField('order', stage.questions).map(
        (question, questionIndex) => (
          <QuestionPassing
            key={question.id}
            question={question}
            index={questionIndex + 1}
          />
        ),
      )}
    </Fieldset>
  );
}
