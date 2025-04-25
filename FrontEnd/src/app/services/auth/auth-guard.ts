import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.authService.logout().subscribe({
            next: (response) => {
              console.log("se acabo el tiempo de sesion", response);
              window.location.href = "/login";
            },
            error: (error) => {
              console.error( error);
            }
          })
        }
      })
    );
  }
}
