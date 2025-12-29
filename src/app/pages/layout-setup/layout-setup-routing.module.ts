import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutSetupPage } from './layout-setup.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutSetupPageRoutingModule {}
