import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-ajustes2',
  templateUrl: 'ajustes2.html',
})
export class Ajustes2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private menuCtrl:MenuController,
   private _auth:AuthServiceProvider,private callNumber: CallNumber) {
  }
  mostrarpaginan(){this.menuCtrl.toggle();}
  ionViewDidLoad() {
    console.log('ionViewDidLoad Ajustes2Page');
  }
 salir(){

    this._auth.signOut();
   // this.navCtrl.push(TabsPage);

  }
  launchDialer(n:string){
        this.callNumber.callNumber(n, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
}
}
