import { useSearchParams } from 'react-router-dom';

export function UserGroupEdit() {
  const asd = useSearchParams();
  console.log('UserGroupEdit useSearchParams: ', asd);
  return <div>UserGroupEdit</div>;
}
