import { Pipe, PipeTransform } from '@angular/core';
import { NewsItem } from '../model/NewsItem';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: NewsItem[], searchedText:string,allStories:NewsItem[]): NewsItem[] {
    if(searchedText) {
      searchedText = searchedText.toLowerCase();
      return allStories.filter((res:NewsItem) => {
        return res.title.toLowerCase().includes(searchedText);
      })
    }
    return value;
  }

}
