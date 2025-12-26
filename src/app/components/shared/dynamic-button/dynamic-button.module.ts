import { NgModule } from '@angular/core';
import { DynamicButtonComponent } from './dynamic-button.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DynamicButtonComponent],
  imports: [IonicModule, CommonModule],
  exports: [DynamicButtonComponent],
})
export class DynamicButtonModule {}
