import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ToastController ,Platform ,LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';
import { CargararchivosProvider } from "../../providers/cargararchivos/cargararchivos";
@IonicPage()
@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {
  titulo:string="";
  imgPreview:string=null;
  img:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,
    private camera:Camera,private platform:Platform,private loadingCtrl:LoadingController,
    public toastCtrl:ToastController,private imagePicker: ImagePicker, private _cas: CargararchivosProvider ) {
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
              this.cerrar();
            },

            ( error )=>{
              loader.dismiss();
              this.mostra_toast("Error al cargar: " + error );
              console.log("Error al cargar " + JSON.stringify(error) );
            }

           )


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SubirPage');
  }
  cerrar(){this.viewCtrl.dismiss();}
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
      this.imgPreview = 'data:image/jpeg;base64,' + imageData;
      this.img=imageData;
      
      }, (err) => {
      // Handle error
      this.mostra_toast("error" + err);
      console.error("erroe en la camara" ,err);
      });
  
   }
   seleccionar_fotos(){
    if(!this.platform.is("cordova")){
      this.mostra_toast("error este no es un dispositivo");
      return;
     }
    let opciones:ImagePickerOptions={
      maximumImagesCount:1,
      quality:40,outputType:1
    }
   
   
      this.imagePicker.getPictures(opciones).then((results) => {
            
     for(let img of results){
       this.imgPreview='data:image/jpeg;base64,'+img
       this.img=img;
       break;
     }
   
       }, (err) => { this.mostra_toast("error plugin selecion" + err);
      console.error("er\:" + JSON.stringify( err));
      });
      
   }
   private mostra_toast(texto:string){
    this.toastCtrl.create({
      message:texto,
      duration :2500
    }).present();
  }
 
}
