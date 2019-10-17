import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { RoleInnComponent } from './role-inn.component';
import { RoleInnDetailComponent } from './role-inn-detail.component';
import { RoleInnUpdateComponent } from './role-inn-update.component';
import { RoleInnDeletePopupComponent, RoleInnDeleteDialogComponent } from './role-inn-delete-dialog.component';
import { roleRoute, rolePopupRoute } from './role-inn.route';

const ENTITY_STATES = [...roleRoute, ...rolePopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RoleInnComponent,
    RoleInnDetailComponent,
    RoleInnUpdateComponent,
    RoleInnDeleteDialogComponent,
    RoleInnDeletePopupComponent
  ],
  entryComponents: [RoleInnDeleteDialogComponent]
})
export class ProvisionerCloudRoleInnModule {}
