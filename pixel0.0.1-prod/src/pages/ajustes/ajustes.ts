import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,MenuController } from 'ionic-angular';
import { ParkDataProvider } from '../../providers/park-data/park-data';
import { ParkDetailsPage } from '../park-details/park-details';

@IonicPage()
@Component({
  selector: 'page-ajustes',
  templateUrl: 'ajustes.html',
})
export class AjustesPage {
  parks: Array<Object> = [];
  constructor(public navCtrl: NavController,public parkData:ParkDataProvider,
  private menuCtrl:MenuController) {
  parkData.getParks().then(theResult => {
  this.parks = theResult;
  
})
  }
mostrarpaginan(){this.menuCtrl.toggle();}

goParkDetails(theParkData) {
  console.log(theParkData);
  this.navCtrl.push(ParkDetailsPage, { parkData: theParkData });
}
getParks(event) {
// Reset items back to all of the items
this.parkData.getParks().then(theResult => {
this.parks = theResult;
 
})
// set queryString to the value of the searchbar
let queryString = event.target.value;
if (queryString !== undefined) {
// if the value is an empty string don't filter the items
if (queryString.trim() == '') {
console.log('ver lista');
return;

}
this.parkData.getFilteredParks(queryString).then(theResult => {
this.parks = theResult;
})
}else{
 
}
}

resetList(event) {
// Reset items back to all of the items
this.parkData.getParks().then(theResult => {
this.parks = theResult;
})
}

customHeaderFn(record, recordIndex, records) {
if ( recordIndex > 0) {
if ( record.name.charAt(0) !== records[recordIndex-1].name.charAt(0)) {
return record.name.charAt(0);
} else {
return null;
}
} else {
return record.name.charAt(0);
}
}


}


