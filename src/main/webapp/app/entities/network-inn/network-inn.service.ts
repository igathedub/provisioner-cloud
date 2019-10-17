import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INetworkInn } from 'app/shared/model/network-inn.model';

type EntityResponseType = HttpResponse<INetworkInn>;
type EntityArrayResponseType = HttpResponse<INetworkInn[]>;

@Injectable({ providedIn: 'root' })
export class NetworkInnService {
  public resourceUrl = SERVER_API_URL + 'api/networks';

  constructor(protected http: HttpClient) {}

  create(network: INetworkInn): Observable<EntityResponseType> {
    return this.http.post<INetworkInn>(this.resourceUrl, network, { observe: 'response' });
  }

  update(network: INetworkInn): Observable<EntityResponseType> {
    return this.http.put<INetworkInn>(this.resourceUrl, network, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INetworkInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INetworkInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
