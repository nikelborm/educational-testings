import { Typography } from 'antd';
import { AbstractTestingForPassingDTO } from 'backendTypes';
import { useMemo } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { remapToIndexedObject } from 'utils';

export function SingleAttemptAnalytics({
  userAnswers,
  abstractTesting,
}: {
  abstractTesting: AbstractTestingForPassingDTO;
  userAnswers: Record<number, number>;
}) {
  const summaryWeightContributionsIntoTagsIndexedByTagName = useMemo(() => {
    const nonUniqueTags = abstractTesting.stages
      .flatMap(({ questions }) => questions)
      .flatMap(({ abstractAnswerOptions }) => abstractAnswerOptions)
      .flatMap(({ contributions }) => contributions)
      .map(({ tag }) => tag);

    const summaryContributions = remapToIndexedObject(
      nonUniqueTags,
      ({ name }) => name,
      () => 0,
    );

    const answerOptions = abstractTesting.stages
      .flatMap(({ questions }) => questions)
      .flatMap(({ abstractAnswerOptions }) => abstractAnswerOptions);

    const answerOptionsIndexedById = remapToIndexedObject(answerOptions);

    for (const [questionId, answerOptionId] of Object.entries(userAnswers)) {
      for (const { tag, weight } of answerOptionsIndexedById[answerOptionId]
        .contributions) {
        summaryContributions[tag.name] += weight;
      }
    }
    return summaryContributions;
  }, [abstractTesting]);

  return (
    <>
      <Typography.Title level={3} style={{ fontWeight: 'bold' }}>
        Результаты попытки
      </Typography.Title>
      <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
        Наиболее интересные вам темы
      </Typography.Title>
      <ReactWordcloud
        size={[500, 300]}
        maxWords={20}
        options={{
          fontSizes: [14, 40],
          deterministic: true,
          rotationAngles: [0, 0],
          rotations: 1,
        }}
        words={Object.entries(
          summaryWeightContributionsIntoTagsIndexedByTagName,
        ).map(([text, value]) => ({ text, value: value * 10 }))}
      />
    </>
  );
}
