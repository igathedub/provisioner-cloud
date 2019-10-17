import { IElementInn } from 'app/shared/model/element-inn.model';
import { IStateInn } from 'app/shared/model/state-inn.model';

export interface IModelInn {
  id?: number;
  name?: string;
  uuid?: number;
  element?: IElementInn;
  states?: IStateInn[];
}

export class ModelInn implements IModelInn {
  constructor(public id?: number, public name?: string, public uuid?: number, public element?: IElementInn, public states?: IStateInn[]) {}
}
