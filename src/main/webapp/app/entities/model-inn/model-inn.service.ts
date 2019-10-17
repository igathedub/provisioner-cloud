import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IModelInn } from 'app/shared/model/model-inn.model';

type EntityResponseType = HttpResponse<IModelInn>;
type EntityArrayResponseType = HttpResponse<IModelInn[]>;

@Injectable({ providedIn: 'root' })
export class ModelInnService {
  public resourceUrl = SERVER_API_URL + 'api/models';

  constructor(protected http: HttpClient) {}

  create(model: IModelInn): Observable<EntityResponseType> {
    return this.http.post<IModelInn>(this.resourceUrl, model, { observe: 'response' });
  }

  update(model: IModelInn): Observable<EntityResponseType> {
    return this.http.put<IModelInn>(this.resourceUrl, model, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModelInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModelInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
