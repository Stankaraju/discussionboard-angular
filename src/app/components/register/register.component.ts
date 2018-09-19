import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = {
    id:0,
    userName: '',
    email: '',
    password: ''
  };
  errorMessage: string;

  constructor(public userService: UserService,
              public router: Router) { 

              }

  ngOnInit() {
  }

  register(){
    this.userService.createAccount(this.user).subscribe(respData => {
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
      this.errorMessage="username already exists";
    });
  }
}
