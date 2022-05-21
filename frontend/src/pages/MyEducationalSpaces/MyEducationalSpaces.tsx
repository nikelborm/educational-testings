import { useParams } from 'react-router-dom';

export function MyEducationalSpaces() {
  const asd = useParams();
  console.log('MyEducationalSpaces useParams: ', asd);
  return <div>MyEducationalSpaces</div>;
}
