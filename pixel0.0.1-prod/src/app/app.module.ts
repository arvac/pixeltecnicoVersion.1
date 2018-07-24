import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CallNumber } from '@ionic-native/call-number';
import { MyApp } from './app.component';


import{HomePage,
  PrincipalPage,
  AjustesPage,
  Ajustes2Page,

  Pagina2Page,
  Pagina3Page,
  ParkDetailsPage,
  NoticiasPage,
  TabsPage}
  from "../pages/index.paginas";
import { PlaceholderPipe } from '../pipes/placeholder/placeholder';
import { ParkDataProvider } from '../providers/park-data/park-data';
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CargararchivosProvider } from '../providers/cargararchivos/cargararchivos';
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import{firebaseConfig}from '../config/firebase.config';

//plugin
import { Camera } from '@ionic-native/camera';
//import facebook y IONIC cLOUD;
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

//import {CloudSettings}from "../config2/ionic.config";
export const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '31fa6d2b'
  }
  ,
  'push': {
    'sender_id': '950257889484',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PrincipalPage,
    AjustesPage,
    Ajustes2Page,
   
    Pagina2Page,
    Pagina3Page,
    TabsPage,
    PlaceholderPipe,
    
    ParkDetailsPage,NoticiasPage,
    
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PrincipalPage,
    AjustesPage,
    Ajustes2Page,
  
    Pagina2Page,
    Pagina3Page,
    TabsPage,ParkDetailsPage,NoticiasPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Camera,
    CargararchivosProvider,
    AuthServiceProvider,
    Facebook,
    SocialSharing,
 
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParkDataProvider
   
   
  ]
})
export class AppModule {}
