import { IPublish } from 'app/shared/model/publish.model';
import { IElementInn } from 'app/shared/model/element-inn.model';

export interface IModelInn {
  id?: number;
  modelId?: string;
  subscribe?: string;
  bind?: string;
  publish?: IPublish;
  element?: IElementInn;
}

export class ModelInn implements IModelInn {
  constructor(
    public id?: number,
    public modelId?: string,
    public subscribe?: string,
    public bind?: string,
    public publish?: IPublish,
    public element?: IElementInn
  ) {}
}
