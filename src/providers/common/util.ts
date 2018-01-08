import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Alert, AlertController, AlertOptions, Loading, LoadingController, LoadingOptions, ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { WechatProvider, IMessage, ShareScene } from './wechat';

declare let X2JS: any

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(public http: HttpClient, private sanitizer: DomSanitizer,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private wechatProvider: WechatProvider) {

  }

  /*toast 开始*/
  success(message, position: string = 'top'): Promise<any> { // 成功
    return this.showToast(message, 'blue', 2000, position)
  }

  warning(message, position: string = 'top'): Promise<any> { // 警告
    return this.showToast(message, 'yellow', 2000, position)
  }

  error(message, position: string = 'top'): Promise<any> { // 错误
    return this.showToast(message, 'red', 2000, position)
  }

  showToast(message: string, color: string = '', duration: number = 2000, position: string = 'top'): Promise<any> {
    let cssClass = ''
    if(!!color) {
      cssClass = 'toast-' + color
    }
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: cssClass
    })
    return toast.present(toast)
  }
  /*toast 结束*/

  /*警告框开始*/
  presentAlert(title: string = '消息提示', subTitle: string = '') {
    let opts: AlertOptions = {
      title: title,
      subTitle: subTitle,
      buttons: ['确定']
    }
    let alert: Alert = this.alertCtrl.create(opts)
    alert.present()
  }

  presentConfirm(title: string = '确认提示', message: string = '', confirmText?: string, cancelText?: string,
    confirmCallback?: Function, cancelCallback?: Function) {
      let buttons: any[] = [{
        text: cancelText || '取消',
        role: 'cancel',
        handler: cancelCallback
      },
      {
        text: confirmText || '确定',
        handler: confirmCallback
      }]
      let option: AlertOptions = {
        title: title,
        message: message,
        buttons: buttons
      }
      let alert: Alert = this.alertCtrl.create(option)
      alert.present()
  }
  /*警告框结束*/

  // loading当dismiss后，必须重新创建
  createLoading(opts?: LoadingOptions, callback?: Function): Loading {
    if (!opts) {
      opts = {
        content: '请稍后',
        showBackdrop: false,
        duration: 3000
      }
    }
    let loader: Loading = this.loadingCtrl.create(opts)
    if (callback != null) {
      loader.onDidDismiss((data, role) => {
        callback(data, role)
      })
    }
    return loader
  }

  /**
   * 深拷贝
  */
  deepCopy(originObj: any): any {
    return originObj ? JSON.parse(JSON.stringify(originObj)) : null
  }

  /**
   * 处理 html 的安全信任
   * @param html raw html
  */
  bypassSecurityTrustHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  /**
   * 处理 style 的安全信任
   * @param style raw html
  */
  bypassSecurityTrustStyle(style: string): any {
    return this.sanitizer.bypassSecurityTrustStyle(style)
  }

  /**
   * 分组
  */
  groupBy(arrs: any[], key: string): any[] {
    let newArrs = []
    let tempKey
    if (Array.isArray(arrs)) {
      // 数据字典的概念
      arrs.forEach((value) => {
        tempKey = value[key]
        if(!newArrs[tempKey]) {
          newArrs[tempKey] = [value]
        } else {
          newArrs[tempKey].push(value)
        }
      })
    }
    return newArrs
  }

  /**
   * 分享消息
   * @param message 消息
   * @param scene 场景
  */
  shareText(message: IMessage, scene: number = ShareScene.SESSION) {
    this.wechatProvider.share(message, scene, () => {
      this.success('分享成功')
    }, (err) => {
      let error: string = err + ''
      if (error.indexOf('取消') < 0) {
        this.error('分享失败:' + err)
      }
    })
  }

  /**
   * 剔除并替换最久的数据
   * @param srcSource 数据源
   * @param item 数据项
   * @param maxCount 最大数量
  */
  edgeOutItem(srcSource: any[], item: any, maxCount: number = 10): any[] {
    if (!Array.isArray(srcSource)) {
      srcSource = [item]
      return srcSource
    }
    let findObj = srcSource.find(value => value.id === item.id)
    if (!findObj) {
      // 如果没找到
      if (srcSource.length < maxCount) { // 数组长度小于10时向数组开头添加当前元素
        srcSource.unshift(item)
      } else { // 数组长度大于等于10时先删除数组最后一个元素，再在开始添加当前元素
        srcSource.pop()
        srcSource.unshift(item)
      }
    }
    return srcSource
  }

  /**
   * xml转JSON
  */
  xmlToJson(xml: string): any {
    return new X2JS().xml2json(xml)
  }

}
