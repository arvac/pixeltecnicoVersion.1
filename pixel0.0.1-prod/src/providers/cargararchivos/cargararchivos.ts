import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from '../../config/firebase.config';

import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";
import { AngularFireModule  } from 'angularfire2';
import { AngularFireDatabaseModule, FirebaseListObservable  } from 'angularfire2/database';
import * as firebase from "firebase";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class CargararchivosProvider {
  private CARPETA_IMAGENES:string = "img";
  private POSTS:string = "post";

  imagenes:any[] = [];
  lastKey:string = undefined;

  constructor( public af: AngularFireDatabase,
               private toastCtrl: ToastController) {
   
  }
    cargar_imagenes(){

    return new Promise(  (resolve, reject)=>{

      this.af.list("/post", {//nombre de la base de datos en firebase

        query: {
          limitToLast: 4,
          orderByKey: true,
          endAt: this.lastKey
        }

      })
      .subscribe( posts =>{

        if( this.lastKey ){
          posts.pop(); // Pruebenlo!
        }

        if( posts.length == 0 ){
          console.log("Ya no existe registros");
          resolve(false);
          return;
        }

        this.lastKey = posts[0].$key;

        for( let i = posts.length-1; i>=0; i-- ){

          let post = posts[i];
          this.imagenes.push( post );

        }

        resolve(true);


      })


    })

  }



  cargar_imagenes_firebase( archivo:archivoSubir ){


    let promesa = new Promise( (resolve, reject)=>{

      this.mostar_toast("Inicio de carga");

      let storageRef = firebase.storage().ref();
      let nombreArchivo = new Date().valueOf(); //1237128371

      let uploadTask:firebase.storage.UploadTask =
              storageRef.child('${ this.CARPETA_IMAGENES  }/${ nombreArchivo }')
              .putString( archivo.img, 'base64', { contentType: 'image/jpeg' }  );


       uploadTask.on(  firebase.storage.TaskEvent.STATE_CHANGED,
          ( snapshot )=>{}, // saber el avance del archivo
          ( error )=>
          ()=>{

            let url = uploadTask.snapshot.downloadURL;
            this.mostar_toast("Imagen cargada exitosamente!!");
            this.crear_post( archivo.titulo, url );
            resolve();

          }
        )

    });

  

    return promesa;

  }

  private crear_post( titulo:string, url:string ){

    let post:archivoSubir = {
      img: url,
      titulo: titulo
    };

    let $key = this.af.list(`/${ this.POSTS}`).push( post ).key;
    
     post.$key = $key;

    this.imagenes.push( post );

  }

   private mostar_toast( texto:string ){
    this.toastCtrl.create({
      message:texto,
      duration: 2500
    }).present();
  }


}
interface archivoSubir{
  $key?:string;
  img:string;
  titulo:string;
}
