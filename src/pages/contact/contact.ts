import { HttpProvider } from './../../providers/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ChatPage } from './chat/chat'

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface ContactModel {
  friendId: string,
  friendName: string,
  message: string
}

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  vm: {
    selectedSegment: string,
    explainList: ContactModel[],
    contactList: ContactModel[]
  } = {
    selectedSegment: 's0',
    explainList: [],
    contactList: []
  }

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProvider: HttpProvider) {
  }

  ionViewDidLoad() {
    this.getContactList()
    this.getExplainList()
  }
  /**
   * slides改变segment状态
  */
  onSlideDidChange() {
    let index: number = this.slides.getActiveIndex()
    if (index >= 0 && index <= 2) {
      this.vm.selectedSegment = "s" + index
    }
  }
  /**
   * segment点击slide滑动
   * @param index
  */
  goToSlide(index: number) {
    if (this.vm.selectedSegment != "s" + index) {
      this.slides.slideTo(index, 500)
    }
  }

  /**
   * 跳转到聊天节目
   * @param friend 好友信息
  */
  onChat(friend: ContactModel) {
    this.navCtrl.push(ChatPage, friend)
  }

  getExplainList() {
    const url = 'assets/data/explain-list.json'
    return this.httpProvider.get(url, false)
      .subscribe(data => {
        if (!data['success']) {
          return false
        }
        this.vm.explainList = data['result']
      }, err => {
        this.httpProvider.handleHttpError(err)
      })
  }
  /**
   * 获取联系人列表
  */
  getContactList(){
    const url = 'assets/data/contact-list.json'
    return this.httpProvider.get(url, false)
      .subscribe(data => {
        if (!data['success']) {
          return false
        }
        this.vm.contactList = data['result']
      })
  }

}
