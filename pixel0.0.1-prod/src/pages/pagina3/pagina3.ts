import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams,ViewController,ToastController ,Platform} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

// servicios
import { CargararchivosProvider } from "../../providers/cargararchivos/cargararchivos";

@IonicPage()
@Component({
  selector: 'page-pagina3',
  templateUrl: 'pagina3.html',
})
export class Pagina3Page {
titulo:string="";
 fotos:string=null;
 img:string="";
  constructor(private viewCtrl:ViewController,
              private camera:Camera, 
              private loadingCtrl:LoadingController,
              private toastCtrl:ToastController,
               private _cas: CargararchivosProvider,
              private platform:Platform) {
  }
  crear_post(){
    console.log("Subiendo imagen...");

    let archivo = {
      'titulo': this.titulo,
      'img': this.img
    };

    let loader = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loader.present();



    this._cas.cargar_imagenes_firebase( archivo )
          .then(
            ()=>{
              loader.dismiss();
              this.cerrar_moda();
            },

            ( error )=>{
              loader.dismiss();
              this.mostra_toast("Error al cargar: " + error );
              console.log("Error al cargar " + JSON.stringify(error) );
            }

           )


  }

 cerrar_moda(){this.viewCtrl.dismiss();}

 mostrar_camera(){
  if(!this.platform.is("cordova")){
   this.mostra_toast("error este no es un dispositivo");
   return;
  }

  const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  correctOrientation:true
                                }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.fotos = 'data:image/jpeg;base64,' + imageData;
    this.img=imageData;
    }, (err) => {
    // Handle error
    this.mostra_toast("error" + err);
    console.error("erroe en la camara" ,err);
    });

 }
 seleccionarfotos(){


 }

 private mostra_toast(texto:string){
   this.toastCtrl.create({
     message:texto,
     duration :2500
   }).present();
 }

}
//ionic g provider cargararchivos
