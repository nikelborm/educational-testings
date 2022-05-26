import { useSearchParams } from 'react-router-dom';

export function UserGroupView() {
  const asd = useSearchParams();
  console.log('UserGroupView useSearchParams: ', asd);
  return <div>UserGroupView</div>;
}
