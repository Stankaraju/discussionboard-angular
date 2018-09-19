import { User } from './../models/User.model';
import { filter } from 'rxjs/operators';
import { Pipe, PipeTransform } from "@angular/core";
import { Topic } from '../models/Topic.model';

@Pipe({
    name: 'createTopic'
})
export class SortBy implements PipeTransform {
    isLoggedInUser: string;
    isLoggedIn: boolean;
    user:User;
    transform(createdBy:any, checked:any): any[] {
        if(this.user){
            this.isLoggedIn= true;
            this.user =JSON.parse(localStorage.getItem('user'));
            this.isLoggedInUser=this.user.userName;
          }else{
            this.isLoggedIn=false;
          }
          if(checked === undefined) return createdBy;
    
   
        return createdBy.filter(createdBy => {
          return JSON.stringify(createdBy).includes(createdBy);
        });
      }
}
// transform(items: any, createdBy: string): any[] {
//   if(this.user){
//       this.isLoggedIn= true;
//       this.user =JSON.parse(localStorage.getItem('user'));
//       this.isLoggedInUser=this.user.userName;
//     }else{
//       this.isLoggedIn=false;
//     }
//     if(createdBy === undefined) return items;
//   if (createdBy==this.isLoggedInUser) return items;
//   createdBy = createdBy;
//   return items.filter(item => {
//     return JSON.stringify(item).includes(createdBy);
//   });
// }