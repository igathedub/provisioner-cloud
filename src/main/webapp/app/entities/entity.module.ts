import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer-inn',
        loadChildren: () => import('./customer-inn/customer-inn.module').then(m => m.ProvisionerCloudCustomerInnModule)
      },
      {
        path: 'app-user-inn',
        loadChildren: () => import('./app-user-inn/app-user-inn.module').then(m => m.ProvisionerCloudAppUserInnModule)
      },
      {
        path: 'facility-inn',
        loadChildren: () => import('./facility-inn/facility-inn.module').then(m => m.ProvisionerCloudFacilityInnModule)
      },
      {
        path: 'role-inn',
        loadChildren: () => import('./role-inn/role-inn.module').then(m => m.ProvisionerCloudRoleInnModule)
      },
      {
        path: 'network-inn',
        loadChildren: () => import('./network-inn/network-inn.module').then(m => m.ProvisionerCloudNetworkInnModule)
      },
      {
        path: 'mesh-group-inn',
        loadChildren: () => import('./mesh-group-inn/mesh-group-inn.module').then(m => m.ProvisionerCloudMeshGroupInnModule)
      },
      {
        path: 'node-inn',
        loadChildren: () => import('./node-inn/node-inn.module').then(m => m.ProvisionerCloudNodeInnModule)
      },
      {
        path: 'element-inn',
        loadChildren: () => import('./element-inn/element-inn.module').then(m => m.ProvisionerCloudElementInnModule)
      },
      {
        path: 'model-inn',
        loadChildren: () => import('./model-inn/model-inn.module').then(m => m.ProvisionerCloudModelInnModule)
      },
      {
        path: 'state-inn',
        loadChildren: () => import('./state-inn/state-inn.module').then(m => m.ProvisionerCloudStateInnModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ProvisionerCloudEntityModule {}
