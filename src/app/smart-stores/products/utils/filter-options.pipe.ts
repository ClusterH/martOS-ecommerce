import { Pipe, PipeTransform } from '@angular/core';
import { Tag, TagAttribute } from '../models';

@Pipe({ name: 'filterOptions' })
export class FilterOptionsPipe implements PipeTransform {
  transform(options: Tag[], filterWith: TagAttribute[]) {
    return options.filter(opt => !(filterWith.find(fw => fw.tagId === opt.id)));
  }
}
