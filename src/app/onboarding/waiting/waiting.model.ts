import { User } from '../../core/store/user/user.model';
import { UserContext } from '../../core/store/user-context/user-context.model';

export interface WaitlistData {
  currentUser: User;
  userContext: UserContext;
}
