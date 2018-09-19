import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 user = {
   id:0,
   userName: '',
   email: '',
   password: ''
 };
 errorMessage: string;
 _route;
  constructor(private authService: AuthService,
              private router: Router) {
                this._route = router;
               }

  ngOnInit() {
  }
  login(){
    //this.router.navigate(['/view']);
    this.authService.logIn(this.user)
      .subscribe(data=>{
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
        }
      )

  }

}
