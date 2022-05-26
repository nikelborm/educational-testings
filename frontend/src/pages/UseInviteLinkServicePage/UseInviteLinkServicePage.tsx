import { useInviteLinkMutation } from 'hooks';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RoutesEnum } from 'types';

export function UseInviteLinkServicePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { sendJoinToGroupQuery } = useInviteLinkMutation(() => {
    navigate(`/account/${RoutesEnum.MY_EDUCATIONAL_SPACES}`);
  });

  useEffect(() => {
    sendJoinToGroupQuery({
      expirationDate: searchParams.get('expirationDate') as string,
      givenByUserId: parseInt(searchParams.get('givenByUserId') as string, 10),
      inviteToUserGroupId: parseInt(
        searchParams.get('inviteToUserGroupId') as string,
        10,
      ),
      signature: searchParams.get('signature') as string,
    });
  }, []);

  return <div>UseIniviteLinkServicePage</div>;
}
