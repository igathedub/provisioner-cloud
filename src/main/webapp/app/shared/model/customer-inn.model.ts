import { IFacilityInn } from 'app/shared/model/facility-inn.model';
import { IAppUserInn } from 'app/shared/model/app-user-inn.model';

export interface ICustomerInn {
  id?: number;
  name?: string;
  address?: string;
  facilities?: IFacilityInn[];
  users?: IAppUserInn[];
}

export class CustomerInn implements ICustomerInn {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public facilities?: IFacilityInn[],
    public users?: IAppUserInn[]
  ) {}
}
