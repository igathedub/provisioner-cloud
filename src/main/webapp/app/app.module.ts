import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ProvisionerCloudSharedModule } from 'app/shared/shared.module';
import { ProvisionerCloudCoreModule } from 'app/core/core.module';
import { ProvisionerCloudAppRoutingModule } from './app-routing.module';
import { ProvisionerCloudHomeModule } from './home/home.module';
import { ProvisionerCloudEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ProvisionerCloudSharedModule,
    ProvisionerCloudCoreModule,
    ProvisionerCloudHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ProvisionerCloudEntityModule,
    ProvisionerCloudAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class ProvisionerCloudAppModule {}
