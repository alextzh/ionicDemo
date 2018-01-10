import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the BarcodeScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html',
})
export class BarcodeScannerPage {
  barcodeData: any
  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodeScannerPage');
  }

  scan() {
    const options = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android
      prompt: 'Place a barcode inside the scan area', // Android
      resultDisplayDuration: 500, // Android
      formats: 'QR_CODE, PDF_417', // Defaults to all formats except PDF_417 and RSS_EXPANDED
      orientation: 'portrait', // Android
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS
    }
    this.barcodeScanner.scan(options)
      .then((data) => {
        this.barcodeData = data
        const alert = this.alertCtrl.create({
          title: 'Scan Result',
          subTitle: data.text,
          buttons: ['OK']
        })
        alert.present()
      })
      .catch((error) => {
        const alert = this.alertCtrl.create({
          title: 'Attention',
          subTitle: error,
          buttons: ['Close']
        })
        alert.present()
      })
  }

}
