import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { NetworkInnComponent } from './network-inn.component';
import { NetworkInnDetailComponent } from './network-inn-detail.component';
import { NetworkInnUpdateComponent } from './network-inn-update.component';
import { NetworkInnDeletePopupComponent, NetworkInnDeleteDialogComponent } from './network-inn-delete-dialog.component';
import { networkRoute, networkPopupRoute } from './network-inn.route';

const ENTITY_STATES = [...networkRoute, ...networkPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NetworkInnComponent,
    NetworkInnDetailComponent,
    NetworkInnUpdateComponent,
    NetworkInnDeleteDialogComponent,
    NetworkInnDeletePopupComponent
  ],
  entryComponents: [NetworkInnDeleteDialogComponent]
})
export class ProvisionerCloudNetworkInnModule {}
