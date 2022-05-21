import { useParams } from 'react-router-dom';

export function LaunchedTestingView() {
  const asd = useParams();
  console.log('LaunchedTestingView useParams: ', asd);
  return <div>LaunchedTestingView</div>;
}
