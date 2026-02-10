import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultPageRoutingModule } from './result-routing.module';

import { ResultPage } from './result.page';
import { Result1Component } from 'src/app/components/result/result1/result1.component';
import { Result2Component } from 'src/app/components/result/result2/result2.component';
import { Result3Component } from 'src/app/components/result/result3/result3.component';
import { Result4Component } from 'src/app/components/result/result4/result4.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ResultPageRoutingModule],
  declarations: [ResultPage, Result1Component, Result2Component, Result3Component, Result4Component],
})
export class ResultPageModule { }
