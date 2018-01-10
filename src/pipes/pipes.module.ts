import { NgModule } from '@angular/core';
import { BackgroundPipe } from './background/background';
import { RelativeTimePipe } from './relative-time/relative-time';
import { FirstFramePipe } from './first-frame/first-frame';
import { CapitalizePipe } from './capitalize/capitalize';
import { ShortenPipe } from './shorten/shorten';
@NgModule({
	declarations: [BackgroundPipe,
    RelativeTimePipe,
    FirstFramePipe,
    CapitalizePipe,
    ShortenPipe],
	imports: [],
	exports: [BackgroundPipe,
    RelativeTimePipe,
    FirstFramePipe,
    CapitalizePipe,
    ShortenPipe]
})
export class PipesModule {}
