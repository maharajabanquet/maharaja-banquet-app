import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpClientModule } from  '@angular/common/http';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Tabs4PageModule } from './tabs4/tabs4.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    Tabs4PageModule
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FirebaseX, FingerprintAIO,  UniqueDeviceID,FCM,
    AndroidPermissions,SplashScreen],
  bootstrap: [AppComponent],
})
export class AppModule {}
