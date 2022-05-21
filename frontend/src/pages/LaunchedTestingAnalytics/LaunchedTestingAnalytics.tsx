import { useParams } from 'react-router-dom';

export function LaunchedTestingAnalytics() {
  const asd = useParams();
  console.log('LaunchedTestingAnalytics useParams: ', asd);
  return <div>LaunchedTestingAnalytics</div>;
}
