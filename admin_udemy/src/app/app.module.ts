import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SubirPage} from '../pages/subir/subir';
import { CargararchivosProvider } from '../providers/cargararchivos/cargararchivos';
import { PlaceholderPipe } from '../pipes/placeholder/placeholder';
//plugin
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import{firebaseConfig}from '../config/firebase.config';
@NgModule({
  declarations: [
    MyApp,
    HomePage,SubirPage,PlaceholderPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
   AngularFireDatabaseModule,
   AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,SubirPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,ImagePicker,CargararchivosProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
