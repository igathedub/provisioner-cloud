import { IModelInn } from 'app/shared/model/model-inn.model';
import { INodeInn } from 'app/shared/model/node-inn.model';

export interface IElementInn {
  id?: number;
  index?: number;
  location?: string;
  name?: string;
  models?: IModelInn[];
  node?: INodeInn;
}

export class ElementInn implements IElementInn {
  constructor(
    public id?: number,
    public index?: number,
    public location?: string,
    public name?: string,
    public models?: IModelInn[],
    public node?: INodeInn
  ) {}
}
