import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicPagePageRoutingModule } from './dynamic-page-routing.module';

import { DynamicPagePage } from './dynamic-page.page';
import { NestedFilterComponent } from 'src/app/components/dynamic-layout/nested-filter/nested-filter.component';
import { DynamicButtonComponent } from 'src/app/components/shared/dynamic-button/dynamic-button.component';
import { DynamicButtonModule } from 'src/app/components/shared/dynamic-button/dynamic-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicPagePageRoutingModule,
    DynamicButtonModule,
  ],

  declarations: [DynamicPagePage, NestedFilterComponent],
})
export class DynamicPagePageModule {}
