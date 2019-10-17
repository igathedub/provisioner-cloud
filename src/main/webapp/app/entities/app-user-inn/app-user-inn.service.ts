import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAppUserInn } from 'app/shared/model/app-user-inn.model';

type EntityResponseType = HttpResponse<IAppUserInn>;
type EntityArrayResponseType = HttpResponse<IAppUserInn[]>;

@Injectable({ providedIn: 'root' })
export class AppUserInnService {
  public resourceUrl = SERVER_API_URL + 'api/app-users';

  constructor(protected http: HttpClient) {}

  create(appUser: IAppUserInn): Observable<EntityResponseType> {
    return this.http.post<IAppUserInn>(this.resourceUrl, appUser, { observe: 'response' });
  }

  update(appUser: IAppUserInn): Observable<EntityResponseType> {
    return this.http.put<IAppUserInn>(this.resourceUrl, appUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAppUserInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppUserInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
