import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomerInn } from 'app/shared/model/customer-inn.model';
import { CustomerInnService } from './customer-inn.service';
import { CustomerInnComponent } from './customer-inn.component';
import { CustomerInnDetailComponent } from './customer-inn-detail.component';
import { CustomerInnUpdateComponent } from './customer-inn-update.component';
import { CustomerInnDeletePopupComponent } from './customer-inn-delete-dialog.component';
import { ICustomerInn } from 'app/shared/model/customer-inn.model';

@Injectable({ providedIn: 'root' })
export class CustomerInnResolve implements Resolve<ICustomerInn> {
  constructor(private service: CustomerInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomerInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomerInn>) => response.ok),
        map((customer: HttpResponse<CustomerInn>) => customer.body)
      );
    }
    return of(new CustomerInn());
  }
}

export const customerRoute: Routes = [
  {
    path: '',
    component: CustomerInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CustomerInnDetailComponent,
    resolve: {
      customer: CustomerInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CustomerInnUpdateComponent,
    resolve: {
      customer: CustomerInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CustomerInnUpdateComponent,
    resolve: {
      customer: CustomerInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const customerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CustomerInnDeletePopupComponent,
    resolve: {
      customer: CustomerInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Customers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
