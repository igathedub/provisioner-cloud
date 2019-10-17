import { IAppUserInn } from 'app/shared/model/app-user-inn.model';

export interface IRoleInn {
  id?: number;
  name?: string;
  description?: string;
  appUser?: IAppUserInn;
}

export class RoleInn implements IRoleInn {
  constructor(public id?: number, public name?: string, public description?: string, public appUser?: IAppUserInn) {}
}
