import { HttpProvider } from './../../../providers/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatProvider, ChatMessage, UserInfo } from '../../../providers/chat/chat';
import { UtilProvider } from '../../../providers/common/util';
import { FileProvider } from '../../../providers/common/file';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content
  @ViewChild('chat_input') messageInput: TextInput

  msgList: ChatMessage[] = []
  user: UserInfo
  toUser: UserInfo
  editorMsg: any = ''
  showEmojiPicker: boolean = false


  constructor(public navParams: NavParams, public chatProvider: ChatProvider,
    public events: Events, public httpProvider: HttpProvider,
    public utilProvider: UtilProvider, public fileProvider: FileProvider) {
      this.toUser = {
        id: navParams.get('friendId'),
        name: navParams.get('friendName')
      }
  }

  ionViewDidLoad() {
    this.chatProvider.getUserInfo().then(res => {
      this.user = res
      this.getMsg()
      setTimeout(() => {
        this.scrollToBottom()
      }, 400)
    })
  }

  ionViewDidEnter() {
    this.events.subscribe('chat: received', msg => {
      this.pushNewMsg(msg)
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('chat: received')
  }

  photoBrowser($event) {

  }

  scrollToBottom() {
    if (this.content) {
      this.content.resize()
      this.content.scrollToBottom()
    }
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  onFocus() {
    this.showEmojiPicker = false
    this.scrollToBottom()
  }
  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus()
    }
    this.scrollToBottom()
  }

  /**
   * getMsg 获取信息列表
  */
  getMsg() {
    const url = 'assets/data/msg-list.json'
    this.httpProvider.get(url, false)
      .subscribe(data => {
        this.msgList = data['result']
      }, err => {
        this.httpProvider.handleHttpError(err)
      })
  }
  /**
   * sendMsg
  */
  sendMsg(newMsg?: ChatMessage) {
    if (!this.editorMsg) {
      this.utilProvider.warning('聊天内容不能为空')
      return false
    }
    const id = Date.now().toString()
    if (!newMsg) {
      newMsg = {
        messageId: Date.now().toString(),
        userId: this.user.id,
        userName: this.user.name,
        userAvatar: this.user.avatar,
        toUserId: this.toUser.id,
        time: Date.now(),
        message: this.editorMsg.trim(),
        status: 'pending',
        photo: ''
      }
    }
    this.pushNewMsg(newMsg)

    if (!this.showEmojiPicker) {
      this.messageInput.setFocus()
    }

    this.chatProvider.sendMsg(newMsg).then(() => {
      let index = this.getMsgIndexById(id)
      if (index > -1) {
        this.msgList[index].status = 'success'
        this.editorMsg = ''
      }     
    })
  }
  /**
   * pushNewMsg
  */
  pushNewMsg(msg: ChatMessage) {
    let userId = this.user.id
    let toUserId = this.toUser.id
    if ((msg.userId === userId && msg.toUserId === toUserId) || (msg.toUserId === userId && msg.userId === toUserId)) {
      this.msgList.push(msg)
    }
    this.scrollToBottom()
  }

  /**
   * sendImage
  */
  sendImage() {
    this.fileProvider.mutiImagePick(results => {
      if (Array.isArray(results)) {
        results.forEach(item => {
          let msg: ChatMessage = new ChatMessage()
          msg.photo = item
          this.sendMsg(msg)
        })
      }
    }, error => {
      this.utilProvider.warning('发送图片失败')
    })
  }

}
