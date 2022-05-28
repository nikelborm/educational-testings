import { useSearchParams } from 'react-router-dom';

export function AvailableTestings() {
  const [searchParams] = useSearchParams();
  console.log('AvailableTestings useSearchParams: ', searchParams);
  return <div>AvailableTestings</div>;
}
