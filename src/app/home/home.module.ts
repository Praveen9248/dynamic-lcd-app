import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Header1Component } from '../components/header/header1/header1.component';
import { Header2Component } from '../components/header/header2/header2.component';
import { Header3Component } from '../components/header/header3/header3.component';
import { Header4Component } from '../components/header/header4/header4.component';
import { Content2Component } from '../components/content/content2/content2.component';
import { Content3Component } from '../components/content/content3/content3.component';
import { Content4Component } from '../components/content/content4/content4.component';
import { content1Module } from '../components/content/content1/content1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    content1Module,
  ],
  declarations: [
    HomePage,
    Header1Component,
    Header2Component,
    Header3Component,
    Header4Component,
    Content2Component,
    Content3Component,
    Content4Component,
  ],
})
export class HomePageModule {}
