import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// pages
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from './../pages/home/home';
import { SettingPage } from './../pages/person/setting/setting';
import { ChatPage } from './../pages/contact/chat/chat';
import { PersonPage } from './../pages/person/person';
import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { GetImagePage } from '../pages/person/get-image/get-image';

// native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { ImagePicker } from '@ionic-native/image-picker';

// components
import { EmojiPickerComponent } from '../components/emoji-picker/emoji-picker';
import { PopupMenuComponent } from '../components/popup-menu/popup-menu';

// providers
import { ChatProvider } from '../providers/chat/chat';
import { ConfigProvider } from '../providers/common/config';
import { HttpProvider } from '../providers/common/http';
import { AuthProvider } from '../providers/common/auth';
import { CacheProvider } from '../providers/common/cache';
import { UtilProvider } from '../providers/common/util';
import { WechatProvider } from '../providers/common/wechat';
import { EmojiProvider } from '../providers/common/emoji';
import { FileProvider } from '../providers/common/file';
import { CameraProvider } from '../providers/camera/camera';

// pipes
import { RelativeTimePipe } from '../pipes/relative-time/relative-time';
import { FirstFramePipe } from '../pipes/first-frame/first-frame';
import { BackgroundPipe } from '../pipes/background/background';

// directives
import { KeyboardAttachDirective } from '../directives/keyboard-attach/keyboard-attach';
import { MyModeDirective } from '../directives/my-mode/my-mode';

// videogular2
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';





@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    AboutPage,
    ContactPage,
    ChatPage,
    PersonPage,
    SettingPage,
    GetImagePage,
    RelativeTimePipe,
    FirstFramePipe,
    BackgroundPipe,
    KeyboardAttachDirective,
    MyModeDirective,
    EmojiPickerComponent,
    PopupMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { 
      mode: "ios",
      backButtonText: '',
      tabsHideOnSubPages: true,
      scrollAssist: true,
      autoFocusAssist: 'delay'
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    AboutPage,
    ContactPage,
    ChatPage,
    PersonPage,
    SettingPage,
    GetImagePage,
    EmojiPickerComponent,
    PopupMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Keyboard,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpProvider,
    AuthProvider,
    CacheProvider,
    UtilProvider,
    ChatProvider,
    WechatProvider,
    EmojiProvider,
    FileProvider,
    CameraProvider
  ]
})
export class AppModule {}
