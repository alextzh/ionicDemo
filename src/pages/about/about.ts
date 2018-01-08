import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';
import { HttpProvider } from './../../providers/common/http';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Slides) slides: Slides

  vm: {
    dessertSlides: any[],
    dessertList: any[],
    mode: string
  } = {
    dessertSlides: [],
    dessertList: [],
    mode: 'one'
  }

  constructor(public navCtrl: NavController, private cd: ChangeDetectorRef, private httpProvider: HttpProvider) {
  }

  ionViewDidLoad() {
    this.getDessertSlides()
    this.getDessertList()
  }

  /**
   * 获取甜点轮播图片
  */
  getDessertSlides() {
    const url = '../../assets/data/dessert-slides.json'
    this.httpProvider.get(url, false)
      .subscribe(data => {
        console.log(data)
        if (!data['success']) {
          return false
        }
        this.vm.dessertSlides = data['result']
        this.cd.detectChanges()
      }, err => {
        this.httpProvider.handleHttpError(err)
      })
  }

  /**
   * 获取甜点列表
  */
  getDessertList() {
    const url = '../../assets/data/dessert-list.json'
    this.httpProvider.get(url, false)
      .subscribe(data => {
        console.log(data)
        if(!data['success']) {
          return false
        }
        this.vm.dessertList = data['result']
      }, err => {
        this.httpProvider.handleHttpError(err)
      })
  }

}
