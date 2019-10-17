import { INetworkInn } from 'app/shared/model/network-inn.model';
import { INodeInn } from 'app/shared/model/node-inn.model';

export interface IMeshGroupInn {
  id?: number;
  name?: string;
  virtual?: boolean;
  network?: INetworkInn;
  nodes?: INodeInn[];
}

export class MeshGroupInn implements IMeshGroupInn {
  constructor(public id?: number, public name?: string, public virtual?: boolean, public network?: INetworkInn, public nodes?: INodeInn[]) {
    this.virtual = this.virtual || false;
  }
}
