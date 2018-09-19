import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  isLoggedInUser: string;
  user:User;
  constructor(private router: Router,
    public authservice:AuthService) {
      this.user =JSON.parse(localStorage.getItem('user')); 
     }
 
 
  logOut() {
   localStorage.removeItem('user');
  // this.router.navigate(['/login']);

  } 
  
  ngOnInit() {
    if(this.user){
      this.isLoggedIn= true;
      this.user =JSON.parse(localStorage.getItem('user'));
      this.isLoggedInUser=this.user.userName;
    }else{
      this.isLoggedIn=false;
    }
    
  }
}
