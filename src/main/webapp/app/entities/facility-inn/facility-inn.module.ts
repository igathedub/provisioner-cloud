import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { FacilityInnComponent } from './facility-inn.component';
import { FacilityInnDetailComponent } from './facility-inn-detail.component';
import { FacilityInnUpdateComponent } from './facility-inn-update.component';
import { FacilityInnDeletePopupComponent, FacilityInnDeleteDialogComponent } from './facility-inn-delete-dialog.component';
import { facilityRoute, facilityPopupRoute } from './facility-inn.route';

const ENTITY_STATES = [...facilityRoute, ...facilityPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FacilityInnComponent,
    FacilityInnDetailComponent,
    FacilityInnUpdateComponent,
    FacilityInnDeleteDialogComponent,
    FacilityInnDeletePopupComponent
  ],
  entryComponents: [FacilityInnDeleteDialogComponent]
})
export class ProvisionerCloudFacilityInnModule {}
