import { useSearchParams } from 'react-router-dom';

export function EducationalSpaceEdit() {
  const asd = useSearchParams();
  console.log('EducationalSpaceEdit useSearchParams: ', asd);
  return <div>EducationalSpaceEdit</div>;
}
