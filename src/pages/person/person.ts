import { SettingPage } from './setting/setting';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

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
  pushPage: any

  constructor(public navCtrl: NavController) {
    this.pushPage = SettingPage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage')
  }

  onInvite() {
    console.log('222')
  }

}
