import { UserAuthInfo } from 'src/types';
import { UniversalTokenPart } from './universalTokenPart';

export interface UserAccessTokenPayload extends UniversalTokenPart {
  user: UserAuthInfo;
}
