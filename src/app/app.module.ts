import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AdMobFree } from '@ionic-native/admob-free';

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { ResultadoPage } from './../pages/resultado/resultado';

@NgModule({
  declarations: [
    HomePage,
    MyApp,
    ResultadoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HomePage,
    MyApp,
    ResultadoPage
  ],
  providers: [
    AdMobFree,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
