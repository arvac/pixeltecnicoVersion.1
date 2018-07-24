import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController ,ToastController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import {Pagina2Page,AjustesPage} from "../index.paginas";
@IonicPage()
@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {
  pagina2:any=Pagina2Page;
  constructor(public navCtrl: NavController,private menuCtrl:MenuController,
  private socialSharing: SocialSharing,private toastCtrl:ToastController) {
  }

navegarpagina(){
this.navCtrl.push(AjustesPage);
}
mostrarpaginan(){this.menuCtrl.toggle();}


compartir(post:any){// Check if sharing via email is supported
this.socialSharing.shareViaFacebook(post.img).then(() => {
  // Sharing via email is possible
  this.toastCtrl.create({message:"comaprtido exitosamente",
duration:2500}).present();

}).catch((error) => {
  // Sharing via email is not possible
  this.toastCtrl.create({message:error,
duration:2500}).present();
});}
}
