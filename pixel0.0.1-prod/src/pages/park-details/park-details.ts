import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController  } from 'ionic-angular';

/**
 * Generated class for the ParkDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-park-details',
  templateUrl: 'park-details.html',
})
export class ParkDetailsPage {
  parkInfo: Object;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private menuCtrl:MenuController) {
    this.parkInfo=navParams.data.parkData;
    console.log(this.parkInfo);
  }
 mostrarpaginan(){this.menuCtrl.toggle();}
  ionViewDidLoad() {
    console.log('vista desde la consola ');
  }

}

