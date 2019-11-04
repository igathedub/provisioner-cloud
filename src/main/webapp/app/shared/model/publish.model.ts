import { IRetransmit } from 'app/shared/model/retransmit.model';
import { IModelInn } from 'app/shared/model/model-inn.model';

export interface IPublish {
  id?: number;
  index?: number;
  credentials?: number;
  ttl?: number;
  period?: number;
  address?: string;
  retransmit?: IRetransmit;
  model?: IModelInn;
}

export class Publish implements IPublish {
  constructor(
    public id?: number,
    public index?: number,
    public credentials?: number,
    public ttl?: number,
    public period?: number,
    public address?: string,
    public retransmit?: IRetransmit,
    public model?: IModelInn
  ) {}
}
