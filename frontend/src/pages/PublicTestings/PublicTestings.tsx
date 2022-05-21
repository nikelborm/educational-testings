import { useParams } from 'react-router-dom';

export function PublicTestings() {
  const asd = useParams();
  console.log('PublicTestings useParams: ', asd);
  return <div>PublicTestings</div>;
}
