import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicPagePage } from './dynamic-page.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicPagePageRoutingModule {}
