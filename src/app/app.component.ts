import { query,style,animate,trigger, transition, group } from '@angular/animations';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'app';
  getDepth(outlet){
    return outlet.activatedRouteData['depth'];
  }
}
