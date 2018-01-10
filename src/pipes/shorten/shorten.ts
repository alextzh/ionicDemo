import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ShortenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  /**
   * Shortens the string to a given length.
   * Input: {{'This is a very long string' | shorten:18}}
   * Output: This is a very lon...
   */
  transform(value: string, maxWidth: number = 30, suffix: string = '...') {
    if (value && value.length > maxWidth) {
      value = value.substring(0, maxWidth) + suffix
    }
    return value
  }
}
