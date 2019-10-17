import { INodeInn } from 'app/shared/model/node-inn.model';
import { IModelInn } from 'app/shared/model/model-inn.model';

export interface IElementInn {
  id?: number;
  name?: string;
  node?: INodeInn;
  models?: IModelInn[];
}

export class ElementInn implements IElementInn {
  constructor(public id?: number, public name?: string, public node?: INodeInn, public models?: IModelInn[]) {}
}
