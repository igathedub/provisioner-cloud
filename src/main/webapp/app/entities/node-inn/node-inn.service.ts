import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<INodeInn>(this.resourceUrl, node, { observe: 'response' });
  }

  update(node: INodeInn): Observable<EntityResponseType> {
    return this.http.put<INodeInn>(this.resourceUrl, node, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INodeInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INodeInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
