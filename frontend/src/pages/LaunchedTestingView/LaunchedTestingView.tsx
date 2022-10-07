import { Button, Typography } from 'antd';
import { LaunchedTestingAccessScopeType } from 'backendTypes';
import {
  AboutAbstractTesting,
  SingleAttemptAnalytics,
  TestingPassing,
} from 'components';
import { useIdSearchParam, useLaunchedTestingById } from 'hooks';
import { useState } from 'react';
import { RoutesEnum } from 'types';
import { doesUserHaveTestingAccess, useSession } from 'utils';

export function LaunchedTestingView() {
  const launchedTestingId = useIdSearchParam(RoutesEnum.MY_EDUCATIONAL_SPACES);
  const { launchedTesting } = useLaunchedTestingById(launchedTestingId);
  const session = useSession();
  const [mode, setViewMode] = useState<'about' | 'passing' | 'results'>(
    'about',
  );
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const onFinish = (finalUserAnswers: Record<number, number>) => {
    setUserAnswers(finalUserAnswers);
    setViewMode('results');
  };

  const doesUserHaveAccessFor = (type: LaunchedTestingAccessScopeType) =>
    session.isAuthed &&
    doesUserHaveTestingAccess(
      session.accessToken.payload.user,
      launchedTestingId,
      type,
    );

  const commonAbstractTesting = (launchedTesting?.abstractTesting ||
    launchedTesting?.abstractTestingForPassingAndAnalytics) as
    | {
        goal: string;
        description?: string;
        name: string;
      }
    | undefined;

  return (
    <>
      {commonAbstractTesting && (mode === 'about' || mode === 'results') && (
        <AboutAbstractTesting
          goal={commonAbstractTesting.goal}
          description={commonAbstractTesting.description}
          name={commonAbstractTesting.name}
        />
      )}

      {launchedTesting && (mode === 'about' || mode === 'results') && (
        <AboutLaunchedTesting launchedTesting={launchedTesting} />
      )}

      {doesUserHaveAccessFor(
        LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
      ) &&
        launchedTesting?.abstractTestingForPassingAndAnalytics &&
        mode === 'results' && (
          <SingleAttemptAnalytics
            userAnswers={userAnswers}
            abstractTesting={
              launchedTesting?.abstractTestingForPassingAndAnalytics
            }
          />
        )}

      {doesUserHaveAccessFor(LaunchedTestingAccessScopeType.VIEW_ANALYTICS) &&
        launchedTesting?.abstractTestingForPassingAndAnalytics &&
        mode === 'results' && (
          <SingleAttemptAnalytics
            userAnswers={userAnswers}
            abstractTesting={
              launchedTesting?.abstractTestingForPassingAndAnalytics
            }
          />
        )}

      {launchedTesting?.abstractTestingForPassingAndAnalytics &&
        (mode === 'about' || mode === 'results') && (
          <Button type="primary" onClick={() => setViewMode('passing')}>
            {mode === 'results' ? 'Пройти заново' : 'Начать попытку'}
          </Button>
        )}

      {doesUserHaveAccessFor(
        LaunchedTestingAccessScopeType.MAKE_TESTING_ATTEMPTS,
      ) &&
        launchedTesting?.abstractTestingForPassingAndAnalytics &&
        mode === 'passing' && (
          <TestingPassing
            onFinish={onFinish}
            stages={
              launchedTesting?.abstractTestingForPassingAndAnalytics.stages
            }
          />
        )}
    </>
  );
}

function AboutLaunchedTesting({
  launchedTesting: {
    closingDate,
    maximumAttemptDurationInMinutes,
    openingDate,
  },
}: {
  launchedTesting: {
    openingDate?: Date;
    closingDate?: Date;
    maximumAttemptDurationInMinutes?: number;
  };
}) {
  return (
    <>
      {openingDate && (
        <>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Дата закрытия тестирования
          </Typography.Title>
          <p>{openingDate.toString()}</p>
        </>
      )}
      {closingDate && (
        <>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Дата закрытия тестирования
          </Typography.Title>
          <p>{closingDate.toString()}</p>
        </>
      )}
      {maximumAttemptDurationInMinutes && (
        <>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Длина попытки
          </Typography.Title>
          <p>{maximumAttemptDurationInMinutes.toString()}</p>
        </>
      )}
    </>
  );
}
