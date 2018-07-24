
//ionic cordova build --release android
//keytool -genkey -v -keystore my-release-key.keystore -alias pixel1 -keyalg RSA -keysize 2048 -validity 10000 /para crear el alias y clave/
//jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\build\outputs\apk\android-release-unsigned.apk pixel1
//C:\Users\Iris\AppData\Local\Android\sdk\build-tools\25.0.3\zipalign.exe -v 4 platforms\android\build\outputs\apk\android-release-unsigned.apk Pixel.apk
//keytool -exportcert -alias androiddebugkey -keystore "C:\Users\Iris\.android\debug.keystore" | "C:\OpenSSL\bin\openssl" sha1 -binary | "C:\OpenSSL\bin\openssl" base64
//keytool -exportcert -alias androiddebugkey -keystore "C:\ionic\pixel0.0.1\my-release-key.keystore" | "C:\OpenSSL\bin\openssl" sha1 -binary | "C:\OpenSSL\bin\openssl" base64
import { Component } from '@angular/core';
import { Platform,MenuController,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage,Ajustes2Page,AjustesPage,Pagina2Page} from "../pages/index.paginas";
import { ParkDataProvider } from '../providers/park-data/park-data';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabs=TabsPage;
  ajustes2=Ajustes2Page;
  ajustes=AjustesPage;
  mapa=Pagina2Page;
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl:MenuController
  ,public parkdata:ParkDataProvider,
   private _auth:AuthServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    parkdata.load(); 
  }
  abrirpagina(pagina:any){
    this.rootPage=pagina;this.menuCtrl.close();
  }
  salir(){

    this._auth.signOut();
    this.rootPage = TabsPage;
   // this.navCtrl.push(TabsPage);

  }
}



