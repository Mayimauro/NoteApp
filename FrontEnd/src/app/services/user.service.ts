import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNameOfUser(): Observable<string> {
    return this.http.get(this.apiUrl+'/user', {
      responseType: 'text', // si el backend solo devuelve un string
      withCredentials: true // importante para enviar las cookies
    }).pipe(
      catchError(error => {
        console.error(this.handleError(error));
        return of('false'); // o podés lanzar un error
      })
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }



}
