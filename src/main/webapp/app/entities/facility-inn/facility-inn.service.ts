import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFacilityInn } from 'app/shared/model/facility-inn.model';

type EntityResponseType = HttpResponse<IFacilityInn>;
type EntityArrayResponseType = HttpResponse<IFacilityInn[]>;

@Injectable({ providedIn: 'root' })
export class FacilityInnService {
  public resourceUrl = SERVER_API_URL + 'api/facilities';

  constructor(protected http: HttpClient) {}

  create(facility: IFacilityInn): Observable<EntityResponseType> {
    return this.http.post<IFacilityInn>(this.resourceUrl, facility, { observe: 'response' });
  }

  update(facility: IFacilityInn): Observable<EntityResponseType> {
    return this.http.put<IFacilityInn>(this.resourceUrl, facility, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacilityInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacilityInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
