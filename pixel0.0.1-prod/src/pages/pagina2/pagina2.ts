import { Component , OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';




declare var google:any;
@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html'
})
export class Pagina2Page 
{

map: any;
markers = [];

constructor(public navCtrl: NavController) {
}

ngOnInit() {
this.initMap();
}

private initMap() {
var point = {lat:  -0.2540285781735026, lng: -79.16824291349184};
let divMap = (<HTMLInputElement>document.getElementById('map'));
this.map = new google.maps.Map(divMap, {
center: point,
zoom: 19,
title: 'local',
disableDefaultUI: true,
draggable: false,
zoomControl: true
});

this.createMapMarker(point);
}

private createMapMarker(place:any):void {
var marker = new google.maps.Marker({
map: this.map,
position: place
});
this.markers.push(marker);
}


}
