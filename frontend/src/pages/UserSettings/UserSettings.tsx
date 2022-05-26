import { useSearchParams } from 'react-router-dom';

export function UserSettings() {
  const asd = useSearchParams();
  console.log('UserSettings useSearchParams: ', asd);
  return <div>UserSettings</div>;
}
