import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * 获取域名
   * @param versionType 版本类型，0：正式环境，1：测试环境，2：本地
  */
  static getDomainInfo(versionType: number = 1): any{
    let domain: string
    switch(versionType) {
      case 0: domain = 'http://'; break; // 正式环境
      case 1: domain = 'http://'; break; // 测试环境
      case 2: domain = ''; break; // 本地
      default: domain = ''; break;
    }
    return {domain: domain, versionType: versionType}
  }

  /**
   * 获取 api 地址
  */
  static getApiHost() {
    return ConfigProvider.getDomainInfo().domain + ''
  }
  /**
   * Headers分类
  */
  static defaultHeaders = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
  static formHeaders = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Accept': 'application/json'
  })
  static uploadHeaders = new Headers({
    'Content-Type': 'multipart/form-data'
  })
  /**
   * options分类
  */
  static defaultOptions = {
    headers: ConfigProvider.defaultHeaders
  }
  static formOptions = {
    headers: ConfigProvider.formHeaders
  }
  static uploadOptions = {
    headers: ConfigProvider.uploadHeaders
  }
  
}
