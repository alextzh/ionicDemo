import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Content, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the KeyboardAttachDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */

/**
 * @name KeyboardAttachDirective
 * @source https://gist.github.com/Manduro/bc121fd39f21558df2a952b39e907754
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 * 
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 * 
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */

@Directive({
  selector: '[keyboardAttach]' // Attribute selector
})
export class KeyboardAttachDirective implements OnInit, OnDestroy {
  @Input('keyboardAttach') content: Content

  private onShowSubscription: Subscription
  private onHideSubscription: Subscription

  constructor(private elementRef: ElementRef, private keyboard: Keyboard, private platform: Platform) {
    console.log('Hello KeyboardAttachDirective Directive');
  }

  ngOnInit() {
    if (this.platform.is('cordova') && this.platform.is('ios')) {
      this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(e => this.onShow(e))
      this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(() => this.onHide())
    }
  }

  ngOnDestroy() {

  }

  private onShow(e) {
    let keyboardHeight: number = e.keyboardHeight || (e.detail && e.detail.keyboardHeight)
    this.setElementPosition(keyboardHeight)
  }

  private onHide() {
    this.setElementPosition(0)
  }

  private setElementPosition(pixels: number) {
    this.elementRef.nativeElement.style.paddingBottom = pixels + 'px'
    this.content.resize()
  }

}
