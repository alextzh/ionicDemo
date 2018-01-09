import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController, ActionSheetController } from 'ionic-angular';
import { CameraProvider } from '../../../providers/camera/camera';

/**
 * Generated class for the GetImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-get-image',
  templateUrl: 'get-image.html',
})
export class GetImagePage {

  defaultPicture: 'assets/imgs/girl.jpg'
  choosePicture: any

  constructor(public navCtrl: NavController, public cameraProvider: CameraProvider,
    public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController,
    public platform: Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetImagePage');
  }
  /**
   * actionSheet选择方式上传图片
  */
  changePicture() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'upload picture',
      buttons: [
        {
          text: 'camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture()
          }
        },
        {
          text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.getPicture()
          }
        },{
          text: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('用户已经取消互动')
          }
        }
      ]
    })
    return actionSheet.present()
  }
  /**
   * 相机拍照获取图片
  */
  takePicture() {
    const loading = this.loadingCtrl.create()
    loading.present()
    
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.choosePicture = picture
      }
      loading.dismiss()
    }, error => {
      alert(error)
    })
  }
  /**
   * 从相册中选择图片
  */
  getPicture() {
    const loading = this.loadingCtrl.create()
    loading.present()
    
    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.choosePicture = picture
      }
      loading.dismiss()
    }, error => {
      alert(error)
    })
  }

}
