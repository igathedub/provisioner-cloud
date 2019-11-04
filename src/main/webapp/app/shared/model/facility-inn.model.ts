import { ICustomerInn } from 'app/shared/model/customer-inn.model';
import { INetworkConfiguration } from 'app/shared/model/network-configuration.model';

export interface IFacilityInn {
  id?: number;
  name?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  customer?: ICustomerInn;
  networks?: INetworkConfiguration[];
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
    public networks?: INetworkConfiguration[]
  ) {}
}
