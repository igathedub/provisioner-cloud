import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IElementInn } from 'app/shared/model/element-inn.model';

type EntityResponseType = HttpResponse<IElementInn>;
type EntityArrayResponseType = HttpResponse<IElementInn[]>;

@Injectable({ providedIn: 'root' })
export class ElementInnService {
  public resourceUrl = SERVER_API_URL + 'api/elements';

  constructor(protected http: HttpClient) {}

  create(element: IElementInn): Observable<EntityResponseType> {
    return this.http.post<IElementInn>(this.resourceUrl, element, { observe: 'response' });
  }

  update(element: IElementInn): Observable<EntityResponseType> {
    return this.http.put<IElementInn>(this.resourceUrl, element, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IElementInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IElementInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
