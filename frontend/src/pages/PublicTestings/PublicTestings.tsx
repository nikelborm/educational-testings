import { useSearchParams } from 'react-router-dom';

export function PublicTestings() {
  const [searchParams] = useSearchParams();
  console.log('PublicTestings useSearchParams: ', searchParams);
  return <div>PublicTestings</div>;
}
