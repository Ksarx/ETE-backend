import { Workspace } from 'src/workspace/entities/workspace.entity';
import { User } from '../entities/user.entity';

export class WorkDataDTo {
  user: User;
  workspace: Workspace;
}
