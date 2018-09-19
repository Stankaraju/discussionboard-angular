import { Topic } from './../models/Topic.model';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(createdDate:any, searchDate: any): any {
    if(searchDate === undefined) return createdDate;

    return createdDate.filter(function(date){
      return date.createdDate.toLowerCase().includes(searchDate.toLowerCase());
    })
   
  }
}
