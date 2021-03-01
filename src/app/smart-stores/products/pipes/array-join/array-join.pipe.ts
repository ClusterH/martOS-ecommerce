import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayJoin'
})
export class ArrayJoinPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    console.log('asd')
    const join = value.map(s => s[args]).join(', ');
    return join;
  }

}
