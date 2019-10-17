import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppUserInn } from 'app/shared/model/app-user-inn.model';
import { AppUserInnService } from './app-user-inn.service';
import { AppUserInnComponent } from './app-user-inn.component';
import { AppUserInnDetailComponent } from './app-user-inn-detail.component';
import { AppUserInnUpdateComponent } from './app-user-inn-update.component';
import { AppUserInnDeletePopupComponent } from './app-user-inn-delete-dialog.component';
import { IAppUserInn } from 'app/shared/model/app-user-inn.model';

@Injectable({ providedIn: 'root' })
export class AppUserInnResolve implements Resolve<IAppUserInn> {
  constructor(private service: AppUserInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppUserInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AppUserInn>) => response.ok),
        map((appUser: HttpResponse<AppUserInn>) => appUser.body)
      );
    }
    return of(new AppUserInn());
  }
}

export const appUserRoute: Routes = [
  {
    path: '',
    component: AppUserInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AppUserInnDetailComponent,
    resolve: {
      appUser: AppUserInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AppUserInnUpdateComponent,
    resolve: {
      appUser: AppUserInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AppUserInnUpdateComponent,
    resolve: {
      appUser: AppUserInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const appUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AppUserInnDeletePopupComponent,
    resolve: {
      appUser: AppUserInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'AppUsers'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
