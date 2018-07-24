
import { Component } from '@angular/core';
import { NavController , Platform, ToastController,MenuController,ModalController} from 'ionic-angular';
import{Pagina3Page}from "../index.paginas";

import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public push: Push,
              public toastCtrl:ToastController,
  private menuCtrl:MenuController, public modalCtrl:ModalController ) {

    this.registrarse();


  }
  mostrarpaginan(){this.menuCtrl.toggle();}
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




    //  this.push.on('notification', function(data) {
     //
    //       console.log(data);
    //
    //       // do something with the push data
    //       // then call finish to let the OS know we are done
    //       this.push.finish(function() {
    //           console.log("processing of push data is finished");
    //       }, function() {
    //           console.log("something went wrong with push.finish for ID = " + data.additionalData.notId)
    //       }, data.additionalData.notId);
    //   });


  }
   mostrar_modal(){let modal = this.modalCtrl.create(Pagina3Page);modal.present();}

}
