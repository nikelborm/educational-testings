import { useSearchParams } from 'react-router-dom';

export function PassingTestingStage() {
  const asd = useSearchParams();
  console.log('PassingTestingStage useSearchParams: ', asd);
  return <div>PassingTestingStage</div>;
}
