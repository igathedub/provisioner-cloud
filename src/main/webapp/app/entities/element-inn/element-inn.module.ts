import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { ElementInnComponent } from './element-inn.component';
import { ElementInnDetailComponent } from './element-inn-detail.component';
import { ElementInnUpdateComponent } from './element-inn-update.component';
import { ElementInnDeletePopupComponent, ElementInnDeleteDialogComponent } from './element-inn-delete-dialog.component';
import { elementRoute, elementPopupRoute } from './element-inn.route';

const ENTITY_STATES = [...elementRoute, ...elementPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ElementInnComponent,
    ElementInnDetailComponent,
    ElementInnUpdateComponent,
    ElementInnDeleteDialogComponent,
    ElementInnDeletePopupComponent
  ],
  entryComponents: [ElementInnDeleteDialogComponent]
})
export class ProvisionerCloudElementInnModule {}
