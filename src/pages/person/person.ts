import { SettingPage } from './setting/setting';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { GetImagePage } from './get-image/get-image';
import { BarcodeScannerPage } from './barcode-scanner/barcode-scanner';
import { CreditCardScanPage } from './credit-card-scan/credit-card-scan';
import { NativeGoogleMapsPage } from './native-google-maps/native-google-maps';

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  user: any = {
    name: 'Renee Byrd',
    profileImage: 'assets/imgs/girl.jpg',
    description: 'The apricots are as simple',
    works: 59,
    followers: 2915,
    following: 125
  }
  vm: any = {
    msgNum: 0
  }
  pushSettingPage: any
  pushImagePage: any
  pushBarcodePage: any
  pushCardPage: any
  pushGoogleMapsPage: any

  constructor(public navCtrl: NavController) {
    this.pushSettingPage = SettingPage
    this.pushImagePage = GetImagePage
    this.pushBarcodePage = BarcodeScannerPage
    this.pushCardPage = CreditCardScanPage
    this.pushGoogleMapsPage = NativeGoogleMapsPage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage')
  }

}
