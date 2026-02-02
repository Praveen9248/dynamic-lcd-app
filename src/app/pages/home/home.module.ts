import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { Header1Component } from 'src/app/components/home/header/header1/header1.component';
import { Header2Component } from 'src/app/components/home/header/header2/header2.component';
import { Header3Component } from 'src/app/components/home/header/header3/header3.component';
import { Header4Component } from 'src/app/components/home/header/header4/header4.component';
import { Content1Component } from 'src/app/components/home/content/content1/content1.component';
import { Content2Component } from 'src/app/components/home/content/content2/content2.component';
import { DynamicButtonModule } from 'src/app/components/shared/dynamic-button/dynamic-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DynamicButtonModule,
  ],
  declarations: [
    HomePage,
    Header1Component,
    Header2Component,
    Header3Component,
    Header4Component,
    Content1Component,
    Content2Component,
  ],
})
export class HomePageModule {}
