import { useParams } from 'react-router-dom';

export function AvailableTestings() {
  const asd = useParams();
  console.log('AvailableTestings useParams: ', asd);
  return <div>AvailableTestings</div>;
}
