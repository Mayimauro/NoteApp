import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {RegisterRequest} from '../../interface/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registernUrl = environment.registerUrl;

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.registernUrl,registerRequest, { withCredentials: true }).pipe(
      tap(() => {
        console.log('Registro exitoso');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }


}
