import { useSearchParams } from 'react-router-dom';

export function AttemptView() {
  const asd = useSearchParams();
  console.log('AttemptView useSearchParams: ', asd);
  return <div>AttemptView</div>;
}
