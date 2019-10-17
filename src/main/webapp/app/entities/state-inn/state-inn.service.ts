import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStateInn } from 'app/shared/model/state-inn.model';

type EntityResponseType = HttpResponse<IStateInn>;
type EntityArrayResponseType = HttpResponse<IStateInn[]>;

@Injectable({ providedIn: 'root' })
export class StateInnService {
  public resourceUrl = SERVER_API_URL + 'api/states';

  constructor(protected http: HttpClient) {}

  create(state: IStateInn): Observable<EntityResponseType> {
    return this.http.post<IStateInn>(this.resourceUrl, state, { observe: 'response' });
  }

  update(state: IStateInn): Observable<EntityResponseType> {
    return this.http.put<IStateInn>(this.resourceUrl, state, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStateInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStateInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
