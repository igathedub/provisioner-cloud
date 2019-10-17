import { ICustomerInn } from 'app/shared/model/customer-inn.model';
import { INetworkInn } from 'app/shared/model/network-inn.model';

export interface IFacilityInn {
  id?: number;
  name?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  customer?: ICustomerInn;
  networks?: INetworkInn[];
}

export class FacilityInn implements IFacilityInn {
  constructor(
    public id?: number,
    public name?: string,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public country?: string,
    public customer?: ICustomerInn,
    public networks?: INetworkInn[]
  ) {}
}
