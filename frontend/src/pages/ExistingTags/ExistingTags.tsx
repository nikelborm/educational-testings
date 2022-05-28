import { useSearchParams } from 'react-router-dom';

export function ExistingTags() {
  const [searchParams] = useSearchParams();
  console.log('ExistingTags useSearchParams: ', searchParams);
  return <div>ExistingTags</div>;
}
