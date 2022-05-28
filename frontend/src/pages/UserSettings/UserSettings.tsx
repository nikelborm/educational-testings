import { useSearchParams } from 'react-router-dom';

export function UserSettings() {
  const [searchParams] = useSearchParams();
  console.log('UserSettings useSearchParams: ', searchParams);
  return <div>UserSettings</div>;
}
