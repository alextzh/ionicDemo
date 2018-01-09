import { HttpProvider } from './../../providers/common/http';
import { Component, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { NavController } from 'ionic-angular';
import Swiper from 'swiper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChildren('myMedia') mediaSource: any

  friendNews: string[]
  constructor(public navCtrl: NavController, private cd: ChangeDetectorRef, private httpProvider: HttpProvider) {
  }

  ionViewDidLoad() {
    this.getFriendNews()
  }

  // 获取数据
  getFriendNews() {
    const url = 'assets/data/friend-news.json'
    this.httpProvider.get(url, false)
      .subscribe(data => {
        if (!data['success']) {
          return false
        }
        this.friendNews = data['result']
        this.cd.detectChanges()
        this.initSwiper()
      }, err => {
        this.httpProvider.handleHttpError(err)
      })
  }

  // 初始化 Swiper
  initSwiper() {
    new Swiper('.swiper-container', {
      freeMode: true,
      freeModeMomentumRatio: 5,
      freeModeSticky: true,
      roundLengths: true,
      slidesPerView: 2.5,
      spaceBetween: 10
    })
  }

}
