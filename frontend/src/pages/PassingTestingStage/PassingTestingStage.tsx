import { useSearchParams } from 'react-router-dom';

export function PassingTestingStage() {
  const [searchParams] = useSearchParams();
  console.log('PassingTestingStage useSearchParams: ', searchParams);
  return <div>PassingTestingStage</div>;
}
