import { useParams } from 'react-router-dom';

export function Error404() {
  const asd = useParams();
  console.log('Error404 useParams: ', asd);
  return <div>Error404</div>;
}
