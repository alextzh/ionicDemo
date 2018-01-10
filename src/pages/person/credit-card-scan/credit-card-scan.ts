import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';

/**
 * Generated class for the CreditCardScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credit-card-scan',
  templateUrl: 'credit-card-scan.html',
})
export class CreditCardScanPage {

  cardImage = 'assets/imgs/credit-card.png'
  card = {
    cardType: '',
    cardNumber: '',
    redactedCardNumber: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: '',
    postalCode: ''
  }
  fabGone = false

  constructor(public navCtrl: NavController, private cardIO: CardIO) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditCardScanPage');
  }

  ionViewWillEnter() {
    this.fabGone = false
  }

  ionViewWillLeave() {
    this.fabGone = true
  }

  scanCard() {
    this.cardIO.canScan()
    .then((res: boolean) => {
      if (res) {
        const options = {
          scanExpiry: true,
          hideCardIOLogo: true,
          scanInstructions: 'Please position your card inside the frame',
          keepApplicationTheme: true,
          requireCVV: true,
          requireExpiry: true,
          requirePostalCode: false
        }
        this.cardIO.scan(options).then(res => {
          console.log('Scan Complete')
          const {cardType, cardNumber, redactedCardNumber,
            expiryMonth, expiryYear, cvv, postalCode} = res
          this.card = {
            cardType,
            cardNumber,
            redactedCardNumber,
            expiryMonth,
            expiryYear,
            cvv,
            postalCode
          }
        })
      }
    })
  }

}
