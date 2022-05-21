import { useParams } from 'react-router-dom';

export function PassingTestingStage() {
  const asd = useParams();
  console.log('PassingTestingStage useParams: ', asd);
  return <div>PassingTestingStage</div>;
}
