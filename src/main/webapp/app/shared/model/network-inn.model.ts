import { IFacilityInn } from 'app/shared/model/facility-inn.model';
import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';

export interface INetworkInn {
  id?: number;
  name?: string;
  gobalTTL?: number;
  unicast?: number;
  networkKey?: string;
  keyIndex?: number;
  flagRefreshPhase?: number;
  flagIVUpdate?: number;
  ivIndex?: number;
  appKey?: string;
  facility?: IFacilityInn;
  groups?: IMeshGroupInn[];
}

export class NetworkInn implements INetworkInn {
  constructor(
    public id?: number,
    public name?: string,
    public gobalTTL?: number,
    public unicast?: number,
    public networkKey?: string,
    public keyIndex?: number,
    public flagRefreshPhase?: number,
    public flagIVUpdate?: number,
    public ivIndex?: number,
    public appKey?: string,
    public facility?: IFacilityInn,
    public groups?: IMeshGroupInn[]
  ) {}
}
