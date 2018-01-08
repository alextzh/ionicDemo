import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare let socket: any

export class ChatMessage {
  messageId: string; // 消息ID
  userId: string; // 用户ID
  userName: string; // 用户名
  userAvatar: string; // 用户头像
  toUserId: string; // 对方ID
  time: number | string; // 消息时间
  message: string; // 消息内容
  status: string; // 状态
  photo: string; // 发送图片
}
export class UserInfo {
  id: string;
  name?: string;
  avatar?: string; 
}

@Injectable()
export class ChatProvider {
  username: string = null
  userid: string = null
  socket: any = null

  constructor(public http: HttpClient, private events: Events) {
    
  }
  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Hancock',
      userAvatar: 'assets/imgs/girl.jpg',
      toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success',
      photo: null
    }
    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  sendMsg(msg: ChatMessage) {
    return Promise.resolve(this.mockNewMsg(msg))
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Luff',
      avatar: 'assets/imgs/logo.png'
    }
    return Promise.resolve(userInfo)
  }

  //第一个界面用户提交用户名
  usernameSubmit(userID: string) {
    return false
  }

  // 提交聊天消息内容
  submit(content) {
    if (!content) {
      return false
    }
    let obj = {
      userid: this.userid,
      username: this.username,
      content: content
    }
    this.socket.emit('message', obj)
  }

  // 生成Uid
  genUid() {
    return new Date().getTime + "" + Math.floor(Math.random() * 899 + 100)
  }

  // 更新系统消息，用户加入/退出的时候调用
  updateSysMsg(o: any, action: any) {
    // 当前在线用户列表
    let onlineUsers = o.onlineUsers
    // 当前在线用户数
    let onlineCount = o.onlineCount
    // 新加入的用户
    let user = o.user
    // 更新在线人数
    let userHtml = ''
  }

  init(userName: string) {
    // 客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
    this.userid = this.genUid()
    this.username = userName

    // 连接websocket后端服务器
    this.socket.connect('ws://localhost:3000')
    // 告诉服务器端有用户登陆
    this.socket.emit('login', {userid: this.userid, username: this.username})
    // 监听新用户登陆
    this.socket.on('login', (o: any) => {
      this.updateSysMsg(o, 'login')
    })
    // 监听用户退出
    this.socket.on('logout', (o: any) => {
      this.updateSysMsg(o, 'logout')
    })
    // 监听消息发送
    this.socket.on('message', (obj: any) => {
      let isme = obj.userid === this.userid ? true : false
    })
  }

}
