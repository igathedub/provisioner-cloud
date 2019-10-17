import { Moment } from 'moment';
import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';
import { IElementInn } from 'app/shared/model/element-inn.model';

export interface INodeInn {
  id?: number;
  name?: string;
  provisionTime?: Moment;
  nodeIdentifier?: string;
  unicastAdress?: number;
  features?: number;
  appKey?: string;
  meshGroup?: IMeshGroupInn;
  elements?: IElementInn[];
}

export class NodeInn implements INodeInn {
  constructor(
    public id?: number,
    public name?: string,
    public provisionTime?: Moment,
    public nodeIdentifier?: string,
    public unicastAdress?: number,
    public features?: number,
    public appKey?: string,
    public meshGroup?: IMeshGroupInn,
    public elements?: IElementInn[]
  ) {}
}
