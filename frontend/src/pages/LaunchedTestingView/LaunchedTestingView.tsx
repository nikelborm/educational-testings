import { useSearchParams } from 'react-router-dom';

export function LaunchedTestingView() {
  const asd = useSearchParams();
  console.log('LaunchedTestingView useSearchParams: ', asd);
  return <div>LaunchedTestingView</div>;
}
