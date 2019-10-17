import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StateInn } from 'app/shared/model/state-inn.model';
import { StateInnService } from './state-inn.service';
import { StateInnComponent } from './state-inn.component';
import { StateInnDetailComponent } from './state-inn-detail.component';
import { StateInnUpdateComponent } from './state-inn-update.component';
import { StateInnDeletePopupComponent } from './state-inn-delete-dialog.component';
import { IStateInn } from 'app/shared/model/state-inn.model';

@Injectable({ providedIn: 'root' })
export class StateInnResolve implements Resolve<IStateInn> {
  constructor(private service: StateInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStateInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StateInn>) => response.ok),
        map((state: HttpResponse<StateInn>) => state.body)
      );
    }
    return of(new StateInn());
  }
}

export const stateRoute: Routes = [
  {
    path: '',
    component: StateInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'States'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StateInnDetailComponent,
    resolve: {
      state: StateInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'States'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StateInnUpdateComponent,
    resolve: {
      state: StateInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'States'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StateInnUpdateComponent,
    resolve: {
      state: StateInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'States'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const statePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StateInnDeletePopupComponent,
    resolve: {
      state: StateInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'States'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
