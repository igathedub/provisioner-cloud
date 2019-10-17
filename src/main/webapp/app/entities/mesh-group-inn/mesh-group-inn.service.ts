import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';

type EntityResponseType = HttpResponse<IMeshGroupInn>;
type EntityArrayResponseType = HttpResponse<IMeshGroupInn[]>;

@Injectable({ providedIn: 'root' })
export class MeshGroupInnService {
  public resourceUrl = SERVER_API_URL + 'api/mesh-groups';

  constructor(protected http: HttpClient) {}

  create(meshGroup: IMeshGroupInn): Observable<EntityResponseType> {
    return this.http.post<IMeshGroupInn>(this.resourceUrl, meshGroup, { observe: 'response' });
  }

  update(meshGroup: IMeshGroupInn): Observable<EntityResponseType> {
    return this.http.put<IMeshGroupInn>(this.resourceUrl, meshGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMeshGroupInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMeshGroupInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
