import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePagePageModule
      ),
  },
  {
    path: 'intermediate',
    loadChildren: () =>
      import('./pages/dynamic-page/dynamic-page.module').then(
        (m) => m.DynamicPagePageModule
      ),
  },
  {
    path: 'result',
    loadChildren: () =>
      import('./pages/results-page/results-page.module').then(
        (m) => m.ResultsPagePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'layout-setup',
    loadChildren: () =>
      import('./pages/layout-setup/layout-setup.module').then(
        (m) => m.LayoutSetupPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
