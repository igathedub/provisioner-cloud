import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ModelInn } from 'app/shared/model/model-inn.model';
import { ModelInnService } from './model-inn.service';
import { ModelInnComponent } from './model-inn.component';
import { ModelInnDetailComponent } from './model-inn-detail.component';
import { ModelInnUpdateComponent } from './model-inn-update.component';
import { ModelInnDeletePopupComponent } from './model-inn-delete-dialog.component';
import { IModelInn } from 'app/shared/model/model-inn.model';

@Injectable({ providedIn: 'root' })
export class ModelInnResolve implements Resolve<IModelInn> {
  constructor(private service: ModelInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IModelInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ModelInn>) => response.ok),
        map((model: HttpResponse<ModelInn>) => model.body)
      );
    }
    return of(new ModelInn());
  }
}

export const modelRoute: Routes = [
  {
    path: '',
    component: ModelInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Models'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ModelInnDetailComponent,
    resolve: {
      model: ModelInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Models'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ModelInnUpdateComponent,
    resolve: {
      model: ModelInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Models'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ModelInnUpdateComponent,
    resolve: {
      model: ModelInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Models'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const modelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ModelInnDeletePopupComponent,
    resolve: {
      model: ModelInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Models'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
