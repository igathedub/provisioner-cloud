import { IFacilityInn } from 'app/shared/model/facility-inn.model';
import { IProvisioner } from 'app/shared/model/provisioner.model';
import { INodeInn } from 'app/shared/model/node-inn.model';
import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';
import { INetKey } from 'app/shared/model/net-key.model';
import { IAppKey } from 'app/shared/model/app-key.model';

export interface INetworkConfiguration {
  id?: number;
  meshUUID?: string;
  timestamp?: string;
  meshName?: number;
  facility?: IFacilityInn;
  provisioners?: IProvisioner[];
  nodes?: INodeInn[];
  groups?: IMeshGroupInn[];
  netKeys?: INetKey[];
  appKeys?: IAppKey[];
}

export class NetworkConfiguration implements INetworkConfiguration {
  constructor(
    public id?: number,
    public meshUUID?: string,
    public timestamp?: string,
    public meshName?: number,
    public facility?: IFacilityInn,
    public provisioners?: IProvisioner[],
    public nodes?: INodeInn[],
    public groups?: IMeshGroupInn[],
    public netKeys?: INetKey[],
    public appKeys?: IAppKey[]
  ) {}
}
