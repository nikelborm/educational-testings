import { useSearchParams } from 'react-router-dom';

export function ExistingTags() {
  const asd = useSearchParams();
  console.log('ExistingTags useSearchParams: ', asd);
  return <div>ExistingTags</div>;
}
