import { useParams } from 'react-router-dom';

export function AttemptView() {
  const asd = useParams();
  console.log('AttemptView useParams: ', asd);
  return <div>AttemptView</div>;
}
