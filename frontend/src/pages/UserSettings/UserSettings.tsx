import { useParams } from 'react-router-dom';

export function UserSettings() {
  const asd = useParams();
  console.log('UserSettings useParams: ', asd);
  return <div>UserSettings</div>;
}
