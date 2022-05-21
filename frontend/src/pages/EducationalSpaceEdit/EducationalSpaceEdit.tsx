import { useParams } from 'react-router-dom';

export function EducationalSpaceEdit() {
  const asd = useParams();
  console.log('EducationalSpaceEdit useParams: ', asd);
  return <div>EducationalSpaceEdit</div>;
}
