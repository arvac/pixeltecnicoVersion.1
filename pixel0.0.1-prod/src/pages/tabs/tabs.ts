import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import {PrincipalPage,AjustesPage,NoticiasPage,HomePage,Pagina2Page} from "../index.paginas";
import { ToastController } from 'ionic-angular';
//facebook
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { CargararchivosProvider } from './../../providers/cargararchivos/cargararchivos';

import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1:any=PrincipalPage;
  tab2:any=HomePage;
  tab3:any=NoticiasPage;
  tab4:any=Pagina2Page;
  userProfile: any = null;
  haymas:boolean=true;
   userData: any;
  constructor(public push: Push,public navCtrl: NavController,
  public _cast:CargararchivosProvider,
  private _auth:AuthServiceProvider,public facebook:Facebook,
  private toastCtrl:ToastController,public loadingCtrl: LoadingController ) 
 {
 this.registrarse();
  }
loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      });
    });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Porfavor espere...",
      duration: 3000
    });
    this.navCtrl.push(PrincipalPage);
    loader.present();
  }
  private registrarse(){

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {

      console.log('Token guardado:', t.token);

    }).catch( (error)=>{
        console.log("error en el push Register():" + JSON.stringify(error));
    })

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);

        this.toastCtrl.create({
          message: msg.title + ': ' + msg.text
        }).present();
     })




 
  }
 ingresaprueba(){
   this.navCtrl.push(PrincipalPage);
 
 }
salir(){

    this._auth.signOut();

  }
  ingresar() {

   let loader = this.loadingCtrl.create({
      content: "Porfavor espere..."
   
    });
    
    loader.present();

    let promesa= new Promise((resolve,reject)=>{
      setTimeout(()=>{
        loader.dismiss();
          resolve(true)
          this._auth.signInWithFacebook()
          .then(() => this.onSignInSuccess());
         
      }, 5000);
    });
    return promesa;
  
  }
     private onSignInSuccess(): void {
    console.log("Facebook nombre ",this._auth.displayName());
  }


}
