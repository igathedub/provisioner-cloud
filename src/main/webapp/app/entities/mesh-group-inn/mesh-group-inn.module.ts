import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { MeshGroupInnComponent } from './mesh-group-inn.component';
import { MeshGroupInnDetailComponent } from './mesh-group-inn-detail.component';
import { MeshGroupInnUpdateComponent } from './mesh-group-inn-update.component';
import { MeshGroupInnDeletePopupComponent, MeshGroupInnDeleteDialogComponent } from './mesh-group-inn-delete-dialog.component';
import { meshGroupRoute, meshGroupPopupRoute } from './mesh-group-inn.route';

const ENTITY_STATES = [...meshGroupRoute, ...meshGroupPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MeshGroupInnComponent,
    MeshGroupInnDetailComponent,
    MeshGroupInnUpdateComponent,
    MeshGroupInnDeleteDialogComponent,
    MeshGroupInnDeletePopupComponent
  ],
  entryComponents: [MeshGroupInnDeleteDialogComponent]
})
export class ProvisionerCloudMeshGroupInnModule {}
