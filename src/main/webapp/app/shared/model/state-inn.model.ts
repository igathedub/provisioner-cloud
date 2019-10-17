import { IModelInn } from 'app/shared/model/model-inn.model';

export interface IStateInn {
  id?: number;
  name?: string;
  value?: string;
  uuid?: number;
  model?: IModelInn;
}

export class StateInn implements IStateInn {
  constructor(public id?: number, public name?: string, public value?: string, public uuid?: number, public model?: IModelInn) {}
}
