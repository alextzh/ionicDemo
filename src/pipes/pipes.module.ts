import { NgModule } from '@angular/core';
import { BackgroundPipe } from './background/background';
import { RelativeTimePipe } from './relative-time/relative-time';
import { FirstFramePipe } from './first-frame/first-frame';
@NgModule({
	declarations: [BackgroundPipe,
    RelativeTimePipe,
    FirstFramePipe],
	imports: [],
	exports: [BackgroundPipe,
    RelativeTimePipe,
    FirstFramePipe]
})
export class PipesModule {}
