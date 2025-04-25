import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfoUrl = environment.userInfoUrl

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.http.get(this.userInfoUrl, { withCredentials: true, responseType: 'text' }).pipe(
      map(response => {
        return response.includes("Usuario autenticado");
      }),
      catchError(error => {
        console.error('Error autenticación:', error);
        return of(false);
      })
    );
  }

  logout(): Observable<Object> {

    return this.http.get("http://localhost:8080/auth/logout",{withCredentials: true, responseType: 'text' }).pipe(
      map(response => {
        return response.includes("Logout exitoso");
      }),
      catchError(error => {
        console.error('Error autenticación:', error);
        return of(false);
      })
    );
  }
}
