import { Camera } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(public http: HttpClient, private camera: Camera) {
  }
  /**
   * 通过拍照获取图片
  */
  getPictureFromCamera() {
    return this.getImage(this.camera.PictureSourceType.CAMERA, true)
  }
  /**
   * 从相册获取图片
  */
  getPictureFromPhotoLibrary() {
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY)
  }
  /**
   * 获取图片返回base64Image
   * @param pictureSourceType 图片源类型
   * @param crop 是否裁剪图片
   * @param quality 图片质量
   * @param allowEdit 是否允许编辑
   * @param saveToAlbum 是否允许保存到相册
  */
  getImage(pictureSourceType, crop = false, quality = 50, allowEdit = true, saveToAlbum = true) {
    const options = {
      quality: quality,
      allowEdit: allowEdit,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: pictureSourceType,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: saveToAlbum,
      mediaType: 0
    }
    // 如果设置裁剪，图像限制为600*600的正方形
    if (crop) {
      options['targetWidth'] = 600
      options['targetHeight'] = 600
    }
    return this.camera.getPicture(options).then(imageData => {
      const base64Image = 'data:image/png;base64,' + imageData
      return base64Image
    }, error => {
      console.log('Camera Error ->' + JSON.stringify(error))
    })

  }

}
