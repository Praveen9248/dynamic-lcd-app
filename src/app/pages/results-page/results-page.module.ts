import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultsPagePageRoutingModule } from './results-page-routing.module';

import { ResultsPagePage } from './results-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsPagePageRoutingModule
  ],
  declarations: [ResultsPagePage]
})
export class ResultsPagePageModule {}
