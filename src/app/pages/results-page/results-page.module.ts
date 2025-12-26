import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsPagePageRoutingModule } from './results-page-routing.module';

import { ResultsPagePage } from './results-page.page';
import { LocationFilterComponent } from 'src/app/components/results-layout/location-filter/location-filter.component';
import { ListFilterComponent } from 'src/app/components/results-layout/list-filter/list-filter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPagePageRoutingModule,
  ],
  declarations: [ResultsPagePage, LocationFilterComponent, ListFilterComponent],
})
export class ResultsPagePageModule {}
