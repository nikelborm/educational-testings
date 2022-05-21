import { useParams } from 'react-router-dom';

export function UserGroupEdit() {
  const asd = useParams();
  console.log('UserGroupEdit useParams: ', asd);
  return <div>UserGroupEdit</div>;
}
