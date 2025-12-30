import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutSetupPageRoutingModule } from './layout-setup-routing.module';

import { LayoutSetupPage } from './layout-setup.page';

import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutSetupPageRoutingModule,
    QRCodeComponent,
  ],
  declarations: [LayoutSetupPage],
})
export class LayoutSetupPageModule {}
