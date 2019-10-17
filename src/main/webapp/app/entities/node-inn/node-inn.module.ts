import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { NodeInnComponent } from './node-inn.component';
import { NodeInnDetailComponent } from './node-inn-detail.component';
import { NodeInnUpdateComponent } from './node-inn-update.component';
import { NodeInnDeletePopupComponent, NodeInnDeleteDialogComponent } from './node-inn-delete-dialog.component';
import { nodeRoute, nodePopupRoute } from './node-inn.route';

const ENTITY_STATES = [...nodeRoute, ...nodePopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NodeInnComponent,
    NodeInnDetailComponent,
    NodeInnUpdateComponent,
    NodeInnDeleteDialogComponent,
    NodeInnDeletePopupComponent
  ],
  entryComponents: [NodeInnDeleteDialogComponent]
})
export class ProvisionerCloudNodeInnModule {}
