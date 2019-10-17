import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { StateInnComponent } from './state-inn.component';
import { StateInnDetailComponent } from './state-inn-detail.component';
import { StateInnUpdateComponent } from './state-inn-update.component';
import { StateInnDeletePopupComponent, StateInnDeleteDialogComponent } from './state-inn-delete-dialog.component';
import { stateRoute, statePopupRoute } from './state-inn.route';

const ENTITY_STATES = [...stateRoute, ...statePopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StateInnComponent,
    StateInnDetailComponent,
    StateInnUpdateComponent,
    StateInnDeleteDialogComponent,
    StateInnDeletePopupComponent
  ],
  entryComponents: [StateInnDeleteDialogComponent]
})
export class ProvisionerCloudStateInnModule {}
