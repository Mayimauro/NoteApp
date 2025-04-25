import { Injectable } from '@angular/core';
import {TareaInterface} from '../../interface/tarea-interface';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaCompartidaService {

  private nuevaTareaSubject = new Subject<TareaInterface>();
  nuevaTarea$ = this.nuevaTareaSubject.asObservable();

  emitirNuevaTarea(tarea: TareaInterface) {
    this.nuevaTareaSubject.next(tarea);
  }

  private tareaActualizadaSubject = new Subject<TareaInterface>();
  tareaActualizada$ = this.tareaActualizadaSubject.asObservable();

  emitirTareaActualizada(tarea: TareaInterface) {
    this.tareaActualizadaSubject.next(tarea);
  }

  private tareaActivaSubject = new Subject<TareaInterface | undefined>();
  tareaActiva$ = this.tareaActivaSubject.asObservable();

  setTareaActiva(tarea: TareaInterface | undefined): void {
    this.tareaActivaSubject.next(tarea);
  }


}
