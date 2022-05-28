import { useSearchParams } from 'react-router-dom';

export function EducationalSpaceEdit() {
  const [searchParams] = useSearchParams();
  console.log('EducationalSpaceEdit useSearchParams: ', searchParams);
  return <div>EducationalSpaceEdit</div>;
}
