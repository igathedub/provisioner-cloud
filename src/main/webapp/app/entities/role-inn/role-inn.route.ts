import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoleInn } from 'app/shared/model/role-inn.model';
import { RoleInnService } from './role-inn.service';
import { RoleInnComponent } from './role-inn.component';
import { RoleInnDetailComponent } from './role-inn-detail.component';
import { RoleInnUpdateComponent } from './role-inn-update.component';
import { RoleInnDeletePopupComponent } from './role-inn-delete-dialog.component';
import { IRoleInn } from 'app/shared/model/role-inn.model';

@Injectable({ providedIn: 'root' })
export class RoleInnResolve implements Resolve<IRoleInn> {
  constructor(private service: RoleInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRoleInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<RoleInn>) => response.ok),
        map((role: HttpResponse<RoleInn>) => role.body)
      );
    }
    return of(new RoleInn());
  }
}

export const roleRoute: Routes = [
  {
    path: '',
    component: RoleInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RoleInnDetailComponent,
    resolve: {
      role: RoleInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RoleInnUpdateComponent,
    resolve: {
      role: RoleInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RoleInnUpdateComponent,
    resolve: {
      role: RoleInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rolePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RoleInnDeletePopupComponent,
    resolve: {
      role: RoleInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Roles'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
