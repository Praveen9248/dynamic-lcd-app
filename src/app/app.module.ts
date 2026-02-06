import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageModule } from './pages/home/home.module';
import { IntermediatePageModule } from './pages/intermediate/intermediate.module';
import { ResultPageModule } from './pages/result/result.module';
import { ConfigurationPageModule } from './pages/configuration/configuration.module';

@NgModule({
  declarations: [AppComponent, ScreenSaverComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HomePageModule,
    IntermediatePageModule,
    ResultPageModule,
    ConfigurationPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
