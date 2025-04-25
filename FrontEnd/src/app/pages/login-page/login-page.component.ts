import {Component, OnInit} from '@angular/core';
import {LoginComponent} from '../../components/forms/login-register/login.component';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-register-page',
  imports: [
    LoginComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        window.location.href = "/home";
      }
    });
  }

}
