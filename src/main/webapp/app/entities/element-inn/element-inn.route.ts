import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ElementInn } from 'app/shared/model/element-inn.model';
import { ElementInnService } from './element-inn.service';
import { ElementInnComponent } from './element-inn.component';
import { ElementInnDetailComponent } from './element-inn-detail.component';
import { ElementInnUpdateComponent } from './element-inn-update.component';
import { ElementInnDeletePopupComponent } from './element-inn-delete-dialog.component';
import { IElementInn } from 'app/shared/model/element-inn.model';

@Injectable({ providedIn: 'root' })
export class ElementInnResolve implements Resolve<IElementInn> {
  constructor(private service: ElementInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IElementInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ElementInn>) => response.ok),
        map((element: HttpResponse<ElementInn>) => element.body)
      );
    }
    return of(new ElementInn());
  }
}

export const elementRoute: Routes = [
  {
    path: '',
    component: ElementInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elements'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ElementInnDetailComponent,
    resolve: {
      element: ElementInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elements'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ElementInnUpdateComponent,
    resolve: {
      element: ElementInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elements'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ElementInnUpdateComponent,
    resolve: {
      element: ElementInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elements'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const elementPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ElementInnDeletePopupComponent,
    resolve: {
      element: ElementInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Elements'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
