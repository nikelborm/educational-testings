import { useSearchParams } from 'react-router-dom';

export function AttemptView() {
  const [searchParams] = useSearchParams();
  console.log('AttemptView useSearchParams: ', searchParams);
  return <div>AttemptView</div>;
}
