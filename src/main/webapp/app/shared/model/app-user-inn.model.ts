import { ICustomerInn } from 'app/shared/model/customer-inn.model';
import { IRoleInn } from 'app/shared/model/role-inn.model';

export interface IAppUserInn {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  domain?: string;
  customer?: ICustomerInn;
  roles?: IRoleInn[];
}

export class AppUserInn implements IAppUserInn {
  constructor(
    public id?: number,
    public name?: string,
    public password?: string,
    public email?: string,
    public domain?: string,
    public customer?: ICustomerInn,
    public roles?: IRoleInn[]
  ) {}
}
