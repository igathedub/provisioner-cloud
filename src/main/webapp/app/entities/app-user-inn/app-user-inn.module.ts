import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { AppUserInnComponent } from './app-user-inn.component';
import { AppUserInnDetailComponent } from './app-user-inn-detail.component';
import { AppUserInnUpdateComponent } from './app-user-inn-update.component';
import { AppUserInnDeletePopupComponent, AppUserInnDeleteDialogComponent } from './app-user-inn-delete-dialog.component';
import { appUserRoute, appUserPopupRoute } from './app-user-inn.route';

const ENTITY_STATES = [...appUserRoute, ...appUserPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AppUserInnComponent,
    AppUserInnDetailComponent,
    AppUserInnUpdateComponent,
    AppUserInnDeleteDialogComponent,
    AppUserInnDeletePopupComponent
  ],
  entryComponents: [AppUserInnDeleteDialogComponent]
})
export class ProvisionerCloudAppUserInnModule {}
