import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
  transform(str: string, count: number): string {
    return str + (count !== 1 ? 's' : '');
  }
}
