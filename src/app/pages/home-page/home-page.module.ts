import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';
import { Header1ComponentComponent } from 'src/app/components/home-layout/header/header1-component/header1-component.component';
import { Header2ComponentComponent } from 'src/app/components/home-layout/header/header2-component/header2-component.component';
import { Header3ComponentComponent } from 'src/app/components/home-layout/header/header3-component/header3-component.component';
import { Header4ComponentComponent } from 'src/app/components/home-layout/header/header4-component/header4-component.component';
import { Content1ComponentComponent } from 'src/app/components/home-layout/content/content1-component/content1-component.component';
import { Content2ComponentComponent } from 'src/app/components/home-layout/content/content2-component/content2-component.component';
import { Content3ComponentComponent } from 'src/app/components/home-layout/content/content3-component/content3-component.component';
import { Content4ComponentComponent } from 'src/app/components/home-layout/content/content4-component/content4-component.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicButtonModule } from 'src/app/components/shared/dynamic-button/dynamic-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePagePageRoutingModule,
    DynamicButtonModule,
  ],
  declarations: [
    HomePagePage,
    Header1ComponentComponent,
    Header2ComponentComponent,
    Header3ComponentComponent,
    Header4ComponentComponent,
    Content1ComponentComponent,
    Content2ComponentComponent,
    Content3ComponentComponent,
    Content4ComponentComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePagePageModule {}
