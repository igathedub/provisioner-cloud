import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerInn } from 'app/shared/model/customer-inn.model';

type EntityResponseType = HttpResponse<ICustomerInn>;
type EntityArrayResponseType = HttpResponse<ICustomerInn[]>;

@Injectable({ providedIn: 'root' })
export class CustomerInnService {
  public resourceUrl = SERVER_API_URL + 'api/customers';

  constructor(protected http: HttpClient) {}

  create(customer: ICustomerInn): Observable<EntityResponseType> {
    return this.http.post<ICustomerInn>(this.resourceUrl, customer, { observe: 'response' });
  }

  update(customer: ICustomerInn): Observable<EntityResponseType> {
    return this.http.put<ICustomerInn>(this.resourceUrl, customer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerInn>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerInn[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
