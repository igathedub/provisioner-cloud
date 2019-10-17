import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FacilityInn } from 'app/shared/model/facility-inn.model';
import { FacilityInnService } from './facility-inn.service';
import { FacilityInnComponent } from './facility-inn.component';
import { FacilityInnDetailComponent } from './facility-inn-detail.component';
import { FacilityInnUpdateComponent } from './facility-inn-update.component';
import { FacilityInnDeletePopupComponent } from './facility-inn-delete-dialog.component';
import { IFacilityInn } from 'app/shared/model/facility-inn.model';

@Injectable({ providedIn: 'root' })
export class FacilityInnResolve implements Resolve<IFacilityInn> {
  constructor(private service: FacilityInnService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacilityInn> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FacilityInn>) => response.ok),
        map((facility: HttpResponse<FacilityInn>) => facility.body)
      );
    }
    return of(new FacilityInn());
  }
}

export const facilityRoute: Routes = [
  {
    path: '',
    component: FacilityInnComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacilityInnDetailComponent,
    resolve: {
      facility: FacilityInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacilityInnUpdateComponent,
    resolve: {
      facility: FacilityInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacilityInnUpdateComponent,
    resolve: {
      facility: FacilityInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const facilityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FacilityInnDeletePopupComponent,
    resolve: {
      facility: FacilityInnResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Facilities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
