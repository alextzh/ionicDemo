import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 * 用枚举管理 key 值，防止字符串拼错
*/
export enum CacheKeys {
  TOKEN, AUTO_LOGIN, USER_INFO
}

@Injectable()
export class CacheProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log(CacheKeys[CacheKeys.TOKEN]);
  }

  get(key: CacheKeys): Promise<any> {
    return this.storage.get(CacheKeys[key])
  }

  set(key: CacheKeys, value: any): Promise<any> {
    return this.storage.set(CacheKeys[key], value)
  }

  clear(): Promise<any> {
    return this.storage.clear()
  }

  remove(key: CacheKeys): Promise<any> {
    return this.storage.remove(CacheKeys[key])
  }

}
