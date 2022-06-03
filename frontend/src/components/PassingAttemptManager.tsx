import { AbstractTestingForPassingDTO } from 'backendTypes';
import { Button } from 'antd';
import { useState } from 'react';
import { AboutAbstractTesting } from './AboutAbstractTesting';
import { SingleAttemptAnalytics } from './SingleAttemptAnalytics';
import { TestingPassing } from './TestingPassing';

export function PassingAttemptManager({
  abstractTesting,
  onAnswer,
}: PassingAttemptManagerProps) {
  const [mode, setViewMode] = useState<'about' | 'passing' | 'results'>(
    'about',
  );
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const onFinish = (finalUserAnswers: Record<number, number>) => {
    setUserAnswers(finalUserAnswers);
    setViewMode('results');
  };
  return (
    <>
      {(mode === 'about' || mode === 'results') && (
        <AboutAbstractTesting
          goal={abstractTesting.goal}
          description={abstractTesting.description}
          name={abstractTesting.name}
        />
      )}
      {mode === 'results' && (
        <SingleAttemptAnalytics
          userAnswers={userAnswers}
          abstractTesting={abstractTesting}
        />
      )}
      {(mode === 'about' || mode === 'results') && (
        <Button type="primary" onClick={() => setViewMode('passing')}>
          {mode === 'results' ? 'Пройти заново' : 'Начать тестирование'}
        </Button>
      )}
      {mode === 'passing' && (
        <TestingPassing onFinish={onFinish} stages={abstractTesting.stages} />
      )}
    </>
  );
}

interface PassingAttemptManagerProps {
  abstractTesting: AbstractTestingForPassingDTO;
  onAnswer?: (userGivenAnswer: {
    answerOptionId: number;
    freeFieldAnswer?: string;
  }) => void;
}
