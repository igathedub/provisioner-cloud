import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { CustomerInnComponent } from './customer-inn.component';
import { CustomerInnDetailComponent } from './customer-inn-detail.component';
import { CustomerInnUpdateComponent } from './customer-inn-update.component';
import { CustomerInnDeletePopupComponent, CustomerInnDeleteDialogComponent } from './customer-inn-delete-dialog.component';
import { customerRoute, customerPopupRoute } from './customer-inn.route';

const ENTITY_STATES = [...customerRoute, ...customerPopupRoute];

@NgModule({
  imports: [ProvisionerCloudSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CustomerInnComponent,
    CustomerInnDetailComponent,
    CustomerInnUpdateComponent,
    CustomerInnDeleteDialogComponent,
    CustomerInnDeletePopupComponent
  ],
  entryComponents: [CustomerInnDeleteDialogComponent]
})
export class ProvisionerCloudCustomerInnModule {}
