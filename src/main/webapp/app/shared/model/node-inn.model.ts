import { IFeatures } from 'app/shared/model/features.model';
import { IElementInn } from 'app/shared/model/element-inn.model';
import { IKeyIndex } from 'app/shared/model/key-index.model';
import { INetworkConfiguration } from 'app/shared/model/network-configuration.model';

export interface INodeInn {
  id?: number;
  unicastAddress?: string;
  configComplete?: boolean;
  defaultTTL?: number;
  cid?: string;
  blacklisted?: boolean;
  uUID?: string;
  security?: string;
  crpl?: string;
  name?: string;
  deviceKey?: string;
  vid?: string;
  pid?: string;
  features?: IFeatures;
  elements?: IElementInn[];
  netKeys?: IKeyIndex[];
  appKeys?: IKeyIndex[];
  networkConfiguration?: INetworkConfiguration;
}

export class NodeInn implements INodeInn {
  constructor(
    public id?: number,
    public unicastAddress?: string,
    public configComplete?: boolean,
    public defaultTTL?: number,
    public cid?: string,
    public blacklisted?: boolean,
    public uUID?: string,
    public security?: string,
    public crpl?: string,
    public name?: string,
    public deviceKey?: string,
    public vid?: string,
    public pid?: string,
    public features?: IFeatures,
    public elements?: IElementInn[],
    public netKeys?: IKeyIndex[],
    public appKeys?: IKeyIndex[],
    public networkConfiguration?: INetworkConfiguration
  ) {
    this.configComplete = this.configComplete || false;
    this.blacklisted = this.blacklisted || false;
  }
}
