import { useParams } from 'react-router-dom';

export function EducationalSpaceView() {
  const asd = useParams();
  console.log('EducationalSpaceView useParams: ', asd);
  return <div>EducationalSpaceView</div>;
}
