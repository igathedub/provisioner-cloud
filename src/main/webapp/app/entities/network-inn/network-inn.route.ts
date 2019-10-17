import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NetworkInn } from 'app/shared/model/network-inn.model';
import { NetworkInnService } from './network-inn.service';
import { NetworkInnComponent } from './network-inn.component';
import { NetworkInnDetailComponent } from './network-inn-detail.component';
import { NetworkInnUpdateComponent } from './network-inn-update.component';
import { NetworkInnDeletePopupComponent } from './network-inn-delete-dialog.component';
import { INetworkInn } from 'app/shared/model/network-inn.model';

@Injectable({ providedIn: 'root' })
export class NetworkInnResolve implements Resolve<INetworkInn> {
  constructor(private service: NetworkInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INetworkInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NetworkInn>) => response.ok),
        map((network: HttpResponse<NetworkInn>) => network.body)
      );
    }
    return of(new NetworkInn());
  }
}

export const networkRoute: Routes = [
  {
    path: '',
    component: NetworkInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Networks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NetworkInnDetailComponent,
    resolve: {
      network: NetworkInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Networks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NetworkInnUpdateComponent,
    resolve: {
      network: NetworkInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Networks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NetworkInnUpdateComponent,
    resolve: {
      network: NetworkInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Networks'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const networkPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NetworkInnDeletePopupComponent,
    resolve: {
      network: NetworkInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Networks'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
