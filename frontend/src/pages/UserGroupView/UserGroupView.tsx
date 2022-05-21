import { useParams } from 'react-router-dom';

export function UserGroupView() {
  const asd = useParams();
  console.log('UserGroupView useParams: ', asd);
  return <div>UserGroupView</div>;
}
