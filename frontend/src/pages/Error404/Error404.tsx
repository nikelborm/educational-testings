import { useSearchParams } from 'react-router-dom';

export function Error404() {
  const [searchParams] = useSearchParams();
  console.log('Error404 useSearchParams: ', searchParams);
  return <div>Error404</div>;
}
