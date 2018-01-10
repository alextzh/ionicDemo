import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativeGoogleMapsProvider } from '../../../providers/native-google-maps/native-google-maps';

/**
 * Generated class for the NativeGoogleMapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-native-google-maps',
  templateUrl: 'native-google-maps.html',
})
export class NativeGoogleMapsPage {

  @ViewChild('map') mapElement: ElementRef

  constructor(public navCtrl: NavController, public mapsCtrl: NativeGoogleMapsProvider) {
  }

  ionViewDidLoad() {
    this.mapsCtrl.create(this.mapElement).then(() => this.mapsCtrl.centerToGeolocation())
  }

  addMarker() {
    this.mapsCtrl.addMakerToGeolocation('click me', this.callbackSample)
  }

  callbackSample() {
    console.log('The callback was called :D')
  }

}
