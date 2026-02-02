import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntermediatePageRoutingModule } from './intermediate-routing.module';

import { IntermediatePage } from './intermediate.page';
import { DynamicButtonModule } from 'src/app/components/shared/dynamic-button/dynamic-button.module';
import { DynamicButtonComponent } from 'src/app/components/shared/dynamic-button/dynamic-button.component';
import { DynamicComponent } from 'src/app/components/intermediate/dynamic/dynamic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntermediatePageRoutingModule,
    DynamicButtonModule,
  ],
  declarations: [IntermediatePage, DynamicComponent],
})
export class IntermediatePageModule {}
