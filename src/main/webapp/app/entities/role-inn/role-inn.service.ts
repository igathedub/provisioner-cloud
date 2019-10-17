import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRoleInn } from 'app/shared/model/role-inn.model';

type EntityResponseType = HttpResponse<IRoleInn>;
type EntityArrayResponseType = HttpResponse<IRoleInn[]>;

@Injectable({ providedIn: 'root' })
export class RoleInnService {
  public resourceUrl = SERVER_API_URL + 'api/roles';

  constructor(protected http: HttpClient) {}

  create(role: IRoleInn): Observable<EntityResponseType> {
    return this.http.post<IRoleInn>(this.resourceUrl, role, { observe: 'response' });
  }

  update(role: IRoleInn): Observable<EntityResponseType> {
    return this.http.put<IRoleInn>(this.resourceUrl, role, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRoleInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRoleInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
