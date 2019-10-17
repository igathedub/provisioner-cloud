import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { ModelInnComponent } from './model-inn.component';
import { ModelInnDetailComponent } from './model-inn-detail.component';
import { ModelInnUpdateComponent } from './model-inn-update.component';
import { ModelInnDeletePopupComponent, ModelInnDeleteDialogComponent } from './model-inn-delete-dialog.component';
import { modelRoute, modelPopupRoute } from './model-inn.route';

const ENTITY_STATES = [...modelRoute, ...modelPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ModelInnComponent,
    ModelInnDetailComponent,
    ModelInnUpdateComponent,
    ModelInnDeleteDialogComponent,
    ModelInnDeletePopupComponent
  ],
  entryComponents: [ModelInnDeleteDialogComponent]
})
export class ProvisionerCloudModelInnModule {}
