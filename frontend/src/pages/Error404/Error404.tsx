import { useSearchParams } from 'react-router-dom';

export function Error404() {
  const asd = useSearchParams();
  console.log('Error404 useSearchParams: ', asd);
  return <div>Error404</div>;
}
