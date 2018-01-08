import { NgModule } from '@angular/core';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
import { PopupMenuComponent } from './popup-menu/popup-menu';
@NgModule({
	declarations: [EmojiPickerComponent,
    PopupMenuComponent],
	imports: [],
	exports: [EmojiPickerComponent,
    PopupMenuComponent]
})
export class ComponentsModule {}
