import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsPagePage } from './results-page.page';

const routes: Routes = [
  {
    path: '',
    component: ResultsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsPagePageRoutingModule {}
