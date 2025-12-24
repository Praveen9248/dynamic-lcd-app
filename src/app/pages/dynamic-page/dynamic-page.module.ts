import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicPagePageRoutingModule } from './dynamic-page-routing.module';

import { DynamicPagePage } from './dynamic-page.page';
import { Header1ComponentComponent } from 'src/app/components/home-layout/header/header1-component/header1-component.component';
import { Header2ComponentComponent } from 'src/app/components/home-layout/header/header2-component/header2-component.component';
import { Header3ComponentComponent } from 'src/app/components/home-layout/header/header3-component/header3-component.component';
import { Content1ComponentComponent } from 'src/app/components/home-layout/content/content1-component/content1-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicPagePageRoutingModule,
  ],
  declarations: [
    DynamicPagePage,
    Header1ComponentComponent,
    Header2ComponentComponent,
    Header3ComponentComponent,
    Content1ComponentComponent,
  ],
})
export class DynamicPagePageModule {}
