import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from './config';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// 处理过的响应数据
export interface IResponseData<T> {
  success: boolean;
  msg: string;
  code?: number;
  result?: T; // 响应数据
}

@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * get 方法(isJoinHost是为了兼容获取应用内部数据)
   * @param url 请求url
   * @param isJoinHost 是否合并到主机地址
  */
  get(url: string, isJoinHost: boolean = true) {
    url = (isJoinHost && url.indexOf('http') < 0) ? ConfigProvider.getApiHost() + encodeURI(url) : encodeURI(url)
    return this.http.get(url)
  }

  /**
   * post 方法
   * @param url 请求url
   * @param body 请求参数
   * @param options 请求选项
  */
  post(url: string, body: any = {}, options: any) {
    url = url.indexOf('http') > -1 ? url : ConfigProvider.getApiHost() + url
    options = ConfigProvider.formOptions
    return this.http.post(url, body, options)
  }

  /**
   * 处理 http 错误
  */
  handleHttpError(resp): IResponseData<any> {
    let errMsg = '抱歉，后台服务出错了'
    if (resp) {
      let msg: string = resp.message
      if (msg && msg.toLowerCase().indexOf('timeout') > -1) {
        errMsg = '请求超时，请稍后重试！'
      } else {
        switch (resp.status) {
          case 401: errMsg = '无权限访问，或登录信息已过期，请重新登录'
          case 404: errMsg = '抱歉，后台服务找不到对应接口'
          case 0: errMsg = '网络无法连接'
          default: break
        }
      }
    }
    return {
      success: false,
      msg: errMsg,
      code: -1,
      result: null
    }
  }
  
}
