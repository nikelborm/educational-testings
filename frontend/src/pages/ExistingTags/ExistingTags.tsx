import { useParams } from 'react-router-dom';

export function ExistingTags() {
  const asd = useParams();
  console.log('ExistingTags useParams: ', asd);
  return <div>ExistingTags</div>;
}
