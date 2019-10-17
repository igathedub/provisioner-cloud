import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MeshGroupInn } from 'app/shared/model/mesh-group-inn.model';
import { MeshGroupInnService } from './mesh-group-inn.service';
import { MeshGroupInnComponent } from './mesh-group-inn.component';
import { MeshGroupInnDetailComponent } from './mesh-group-inn-detail.component';
import { MeshGroupInnUpdateComponent } from './mesh-group-inn-update.component';
import { MeshGroupInnDeletePopupComponent } from './mesh-group-inn-delete-dialog.component';
import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';

@Injectable({ providedIn: 'root' })
export class MeshGroupInnResolve implements Resolve<IMeshGroupInn> {
  constructor(private service: MeshGroupInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMeshGroupInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<MeshGroupInn>) => response.ok),
        map((meshGroup: HttpResponse<MeshGroupInn>) => meshGroup.body)
      );
    }
    return of(new MeshGroupInn());
  }
}

export const meshGroupRoute: Routes = [
  {
    path: '',
    component: MeshGroupInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MeshGroups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MeshGroupInnDetailComponent,
    resolve: {
      meshGroup: MeshGroupInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MeshGroups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MeshGroupInnUpdateComponent,
    resolve: {
      meshGroup: MeshGroupInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MeshGroups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MeshGroupInnUpdateComponent,
    resolve: {
      meshGroup: MeshGroupInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MeshGroups'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const meshGroupPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MeshGroupInnDeletePopupComponent,
    resolve: {
      meshGroup: MeshGroupInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MeshGroups'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
