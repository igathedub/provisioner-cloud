import { INodeInn } from 'app/shared/model/node-inn.model';

export interface IKeyIndex {
  id?: number;
  index?: number;
  updated?: boolean;
  node?: INodeInn;
  node?: INodeInn;
}

export class KeyIndex implements IKeyIndex {
  constructor(public id?: number, public index?: number, public updated?: boolean, public node?: INodeInn, public node?: INodeInn) {
    this.updated = this.updated || false;
  }
}
