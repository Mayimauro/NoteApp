import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {TareaInterface} from '../../interface/tarea-interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  apiUrl = environment.tareaUrl;

  constructor(private http: HttpClient) { }

  getAllTareas(): Observable<TareaInterface[]> {
    return this.http.get<TareaInterface[]>(this.apiUrl, {
      withCredentials: true
    }).pipe(
      catchError(error => {
        console.error('Error al obtener tareas:', error);
        return of([]);
      })
    );
  }

  guardarTarea(tarea: TareaInterface): Observable<TareaInterface> {
    return this.http.post<TareaInterface>(this.apiUrl, tarea, {
      withCredentials: true
    }).pipe(
      catchError(error => {
        console.error('Error al crear tarea:', error);
        throw error;
      })
    );
  }

  actualizarTarea(tarea: TareaInterface): Observable<TareaInterface> {
    if (!tarea.id) {
      throw new Error('La tarea no tiene ID para actualizar');
    }

    return this.http.put<TareaInterface>(`${this.apiUrl}/${tarea.id}`, tarea, {
      withCredentials: true
    }).pipe(
      catchError(error => {
        console.error('Error al actualizar tarea:', error);
        throw error;
      })
    );
  }

  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      withCredentials: true
    }).pipe(
      catchError(error => {
        console.error('Error al eliminar tarea:', error);
        throw error;
      })
    );
  }


}
