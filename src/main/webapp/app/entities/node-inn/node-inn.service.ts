import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INodeInn } from 'app/shared/model/node-inn.model';

type EntityResponseType = HttpResponse<INodeInn>;
type EntityArrayResponseType = HttpResponse<INodeInn[]>;

@Injectable({ providedIn: 'root' })
export class NodeInnService {
  public resourceUrl = SERVER_API_URL + 'api/nodes';

  constructor(protected http: HttpClient) {}

  create(node: INodeInn): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(node);
    return this.http
      .post<INodeInn>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(node: INodeInn): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(node);
    return this.http
      .put<INodeInn>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INodeInn>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INodeInn[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(node: INodeInn): INodeInn {
    const copy: INodeInn = Object.assign({}, node, {
      provisionTime: node.provisionTime != null && node.provisionTime.isValid() ? node.provisionTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.provisionTime = res.body.provisionTime != null ? moment(res.body.provisionTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((node: INodeInn) => {
        node.provisionTime = node.provisionTime != null ? moment(node.provisionTime) : null;
      });
    }
    return res;
  }
}
