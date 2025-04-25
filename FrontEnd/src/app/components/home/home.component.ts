import {Component, computed, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {TareaInterface} from '../../interface/tarea-interface';
import {FormsModule} from '@angular/forms';
import {TareaService} from '../../services/tarea/tarea.service';
import {TareaCompartidaService} from '../../services/tarea/tarea-compartida.service';

@Component({
  selector: 'app-home',
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isLeftSidebarCollapsed = input.required<boolean>();
  screenWidth = input.required<number>();


  sizeClass = computed(() => {
    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed();
    if (isLeftSidebarCollapsed) {
      return '';
    }
    return this.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  });

  @Input() tareaActiva!: TareaInterface | undefined;
  descripcionLength: number = 0;


  constructor(private tareaService: TareaService, private tareaCompartida: TareaCompartidaService) {
  }

  ngOnInit(): void {
    this.tareaCompartida.tareaActiva$.subscribe(tarea => {
      this.tareaActiva = tarea;
    });
    this.actualizarContador();
    this.editandoTitulo = false;
  }

  autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // reset
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  actualizarContador() {
    this.descripcionLength = this.tareaActiva?.descripcion?.length || 0;
  }

  crearNuevaTarea(): void {
    const nueva: TareaInterface = {
      titulo: 'Nueva nota',
      descripcion: '',
      completada: false,
    };

    this.tareaService.guardarTarea(nueva).subscribe({
      next: (tarea) => {
        this.tareaActiva = tarea;
        this.tareaCompartida.emitirNuevaTarea(tarea);
      },
      error: (err) => {
        console.error('Error al crear nueva nota', err);
      }
    });
  }

  editarDescripcion(nuevaDesc: string): void {
    if (!this.tareaActiva) return;

    const tareaActualizada = {
      ...this.tareaActiva,
      descripcion: nuevaDesc
    };

    this.tareaService.guardarTarea(tareaActualizada).subscribe({
      next: (tarea) => {
        this.tareaActiva = tarea;
      }
    })
  }

  editandoTitulo = false;

  editarTitulo(nuevoTitulo: string): void {
    if (!this.tareaActiva) return;

    const tituloLimpio = nuevoTitulo.trim();

    if (!tituloLimpio) {
      console.warn('El título no puede estar vacío');
      return;
    }
    const tareaActualizada = {
      id: this.tareaActiva.id,
      titulo: nuevoTitulo,
      descripcion: this.tareaActiva.descripcion,
      completada: this.tareaActiva.completada
    };

    this.tareaService.actualizarTarea(tareaActualizada).subscribe({
      next: (tarea) => {
        this.tareaActiva = tarea;
        this.editandoTitulo = false;
        this.tareaCompartida.emitirTareaActualizada(tarea);
      },
      error: (err) => {
        console.error('Error al actualizar título:', err);
      }
    });

  }


}
