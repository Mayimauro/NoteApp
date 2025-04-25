import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../../services/auth/login.service';
import {RegisterService} from '../../../services/auth/register.service';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('cardToggle') cardToggle!: ElementRef<HTMLInputElement>;

  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private loginService: LoginService
              ,private registerService: RegisterService,private router: Router) {

    // Formulario de Login
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulario de Signup
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log("Inicio de sesión exitoso", response);
          if(response)
          {
            window.location.href = "/home";
          }
          },
        error: (error) => {
          console.error("Error en el inicio de sesión:", error);
          alert("Credenciales incorrectas o problema con el servidor");
        }
      });
    } else {
      console.log('Formulario de Login inválido');
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.registerService.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log("Registro exitoso", response);
          this.cardToggle.nativeElement.checked = false;
        },
        error: (error) => {
            console.error("Error en el inicio de sesión:", error);
            alert("Credenciales incorrectas o problema con el servidor");
        }
      })
    } else {
      console.log('Formulario de Signup inválido');
    }
  }




}
