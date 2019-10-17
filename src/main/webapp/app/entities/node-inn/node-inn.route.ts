import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NodeInn } from 'app/shared/model/node-inn.model';
import { NodeInnService } from './node-inn.service';
import { NodeInnComponent } from './node-inn.component';
import { NodeInnDetailComponent } from './node-inn-detail.component';
import { NodeInnUpdateComponent } from './node-inn-update.component';
import { NodeInnDeletePopupComponent } from './node-inn-delete-dialog.component';
import { INodeInn } from 'app/shared/model/node-inn.model';

@Injectable({ providedIn: 'root' })
export class NodeInnResolve implements Resolve<INodeInn> {
  constructor(private service: NodeInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INodeInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<NodeInn>) => response.ok),
        map((node: HttpResponse<NodeInn>) => node.body)
      );
    }
    return of(new NodeInn());
  }
}

export const nodeRoute: Routes = [
  {
    path: '',
    component: NodeInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NodeInnDetailComponent,
    resolve: {
      node: NodeInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NodeInnUpdateComponent,
    resolve: {
      node: NodeInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nodes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NodeInnUpdateComponent,
    resolve: {
      node: NodeInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nodes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const nodePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NodeInnDeletePopupComponent,
    resolve: {
      node: NodeInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Nodes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
