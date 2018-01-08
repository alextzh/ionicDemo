import { NgModule } from '@angular/core';
import { KeyboardAttachDirective } from './keyboard-attach/keyboard-attach';
import { MyModeDirective } from './my-mode/my-mode';
@NgModule({
	declarations: [KeyboardAttachDirective,
    MyModeDirective],
	imports: [],
	exports: [KeyboardAttachDirective,
    MyModeDirective]
})
export class DirectivesModule {}
