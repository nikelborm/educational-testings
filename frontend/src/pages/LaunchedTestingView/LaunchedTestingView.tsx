import { useSearchParams } from 'react-router-dom';

export function LaunchedTestingView() {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id') as string, 10);
  console.log('LaunchedTestingView useSearchParams: ', searchParams);
  return <div />;
}
