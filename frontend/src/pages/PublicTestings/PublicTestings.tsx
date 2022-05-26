import { useSearchParams } from 'react-router-dom';

export function PublicTestings() {
  const asd = useSearchParams();
  console.log('PublicTestings useSearchParams: ', asd);
  return <div>PublicTestings</div>;
}
