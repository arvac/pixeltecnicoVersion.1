import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,MenuController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { CargararchivosProvider } from './../../providers/cargararchivos/cargararchivos';


//facebook
import { Facebook } from '@ionic-native/facebook';
//firebase
import  firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {
  userProfile: any = null;
  haymas:boolean=true;
  constructor(public navCtrl: NavController,
   public modalCtrl:ModalController,public _cast:CargararchivosProvider,
   private _auth:AuthServiceProvider,public facebook:Facebook,
   private socialSharing: SocialSharing,private toastCtrl:ToastController,
   public push:Push,
  private menuCtrl:MenuController) {
  //this.post = afDB.list('/post');
  this._cast.cargar_imagenes();
}
mostrarpaginan(){this.menuCtrl.toggle();}
private inicializar_notificaciones()

{this.push.register().then((t: PushToken) => {
  return this.push.saveToken(t);
}).then((t: PushToken) => {
  console.log('Token saved:', t.token);
}).catch(error=>{
  console.log("error en el registro notificacion" + JSON.stringify(error));
});

this.push.rx.notification()
  .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);
  });
}
  salir(){

    

    this._auth.signOut();

  }
  ingresar(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());

  }

compartir(post:any){// Check if sharing via email is supported
this.socialSharing.shareViaFacebook(post.titulo,post.img).then(() => {
  // Sharing via email is possible
  this.toastCtrl.create({message:"comaprtido existosamente",
duration:2500}).present();

}).catch((error) => {
  // Sharing via email is not possible
  this.toastCtrl.create({message:error,
duration:2500}).present();
});}

  private onSignInSuccess(): void {
    console.log("Facebook nombre ",this._auth.displayName());
  }


 siguiente(infiniteScroll:any){
 console.log("Siguientes...");

    this._cast.cargar_imagenes()
        .then(
          ( existenMas:boolean )=>{
            infiniteScroll.complete();
            console.log( existenMas );
            this.haymas = existenMas;
          }
        )
 }

  mostrar_modal(){//let modal = this.modalCtrl.create(SubirPage);modal.present();
  }

}
//ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="131832180733924" --variable APP_NAME="curs­o­_­u­demy"
