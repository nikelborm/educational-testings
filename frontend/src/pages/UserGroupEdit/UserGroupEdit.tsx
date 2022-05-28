import { useSearchParams } from 'react-router-dom';

export function UserGroupEdit() {
  const [searchParams] = useSearchParams();
  console.log('UserGroupEdit useSearchParams: ', searchParams);
  return <div>UserGroupEdit</div>;
}
