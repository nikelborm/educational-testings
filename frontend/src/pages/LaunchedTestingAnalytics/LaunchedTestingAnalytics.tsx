import { useSearchParams } from 'react-router-dom';

export function LaunchedTestingAnalytics() {
  const [searchParams] = useSearchParams();
  console.log('LaunchedTestingAnalytics useSearchParams: ', searchParams);
  return <div>LaunchedTestingAnalytics</div>;
}
