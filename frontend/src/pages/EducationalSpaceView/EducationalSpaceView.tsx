import { useEducationalSpaceBy } from 'hooks';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function EducationalSpaceView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = parseInt(searchParams.get('id') as string, 10);
  useEffect(() => {
    if (Number.isNaN(id)) navigate('/account/myEducationalSpaces');
  }, [id]);

  const { educationalSpace } = useEducationalSpaceBy(id);

  return (
    <div>
      id: {educationalSpace?.id} <br />
      name: {educationalSpace?.name} <br />
      description: {educationalSpace?.description} <br />
      Full: <pre>{JSON.stringify(educationalSpace, undefined, 4)}</pre> <br />
    </div>
  );
}
