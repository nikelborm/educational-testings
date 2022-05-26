import { useSearchParams } from 'react-router-dom';

export function LaunchedTestingAnalytics() {
  const asd = useSearchParams();
  console.log('LaunchedTestingAnalytics useSearchParams: ', asd);
  return <div>LaunchedTestingAnalytics</div>;
}
