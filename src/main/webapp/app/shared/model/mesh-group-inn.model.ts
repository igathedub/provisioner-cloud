import { INetworkConfiguration } from 'app/shared/model/network-configuration.model';

export interface IMeshGroupInn {
  id?: number;
  name?: string;
  address?: string;
  parentAddress?: string;
  networkConfiguration?: INetworkConfiguration;
}

export class MeshGroupInn implements IMeshGroupInn {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public parentAddress?: string,
    public networkConfiguration?: INetworkConfiguration
  ) {}
}
