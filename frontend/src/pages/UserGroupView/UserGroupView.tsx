import { useSearchParams } from 'react-router-dom';

export function UserGroupView() {
  const [searchParams] = useSearchParams();
  console.log('UserGroupView useSearchParams: ', searchParams);
  return <div>UserGroupView</div>;
}
