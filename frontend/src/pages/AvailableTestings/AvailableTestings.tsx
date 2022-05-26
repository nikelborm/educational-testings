import { useSearchParams } from 'react-router-dom';

export function AvailableTestings() {
  const asd = useSearchParams();
  console.log('AvailableTestings useSearchParams: ', asd);
  return <div>AvailableTestings</div>;
}
