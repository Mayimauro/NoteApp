import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  output, SimpleChanges
} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth/auth.service';
import {UserService} from '../../services/user.service';
import {TareaService} from '../../services/tarea/tarea.service';
import {TareaInterface} from '../../interface/tarea-interface';
import {TareaCompartidaService} from '../../services/tarea/tarea-compartida.service';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent implements OnInit {

  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  username= '';

  @Output() tareaSeleccionada = new EventEmitter<TareaInterface>();
  @Output() tareaEliminada = new EventEmitter<number>();
  @Input() items: { tarea: TareaInterface, icon: string; label: string }[] = [];


  onSeleccionarTarea(tarea: TareaInterface) {
    this.tareaSeleccionada.emit(tarea);
  }

  constructor(private authService: AuthService,private userService: UserService,
              private tareaService: TareaService,private tareaCompartida: TareaCompartidaService) {}

  ngOnInit() {
    //cargo el nombre del usuario
    this.userService.getNameOfUser().subscribe({
      next: (response) => {
        this.username = response;
      },
      error: (error) => {
        console.error( error);
      }
    })
    //cargo las tareas del usuario
    this.tareaService.getAllTareas().subscribe({
      next: (response: TareaInterface[]) => {
        this.items = response.map(tarea => ({
          tarea: tarea,
          icon: 'fal fa-sticky-note',
          label: tarea.titulo
        }));
      },
      error: (error) => {
        console.error('Error al obtener tareas:', error);
      }
    });
    //escucha las tareas compartidas
    this.tareaCompartida.nuevaTarea$.subscribe(tareaCreada => {
      this.items = [
        ...this.items,
        {
          tarea: tareaCreada,
          label: tareaCreada.titulo,
          icon: 'fal fa-sticky-note',
        }
      ];
    });

    this.tareaCompartida.tareaActualizada$.subscribe(tareaActualizada => {
      this.items = this.items.map(item =>
        item.tarea.id === tareaActualizada.id
          ? {
            ...item,
            tarea: tareaActualizada,
            label: tareaActualizada.titulo
          }
          : item
      );
    });
  }

  // Metodo para cerrar sesión
  logout(): void {
    // Llamamos al servicio para cerrar sesión
    this.authService.logout().subscribe({
      next: (response) => {
        console.log("logOut exitoso", response);
        window.location.href = "/login";
      },
      error: (error) => {
        console.error( error);
      }
    })
  }

  crearTarea(): void {
    const nuevaTarea: TareaInterface = {
      titulo: 'Nueva nota',
      descripcion: '',
      completada: false
    };

    this.tareaService.guardarTarea(nuevaTarea).subscribe({
      next: (tareaCreada) => {
        this.items = [
          ...this.items,
          {
            tarea: tareaCreada,
            label: tareaCreada.titulo,
            icon: 'fal fa-tasks',
          }
        ];
        // Emitir tarea seleccionada para mostrarla en Home
        this.onSeleccionarTarea(tareaCreada);
      },
      error: (err) => {
        console.error('Error al crear tarea:', err);
      }
    });
  }

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  eliminarTarea(tarea: TareaInterface): void {
    if (!tarea.id) return;

    const confirmado = confirm(`¿Estás seguro que quieres eliminar la tarea: "${tarea.titulo}"?`);
    if (!confirmado) return;

    this.tareaService.eliminarTarea(tarea.id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.tarea.id !== tarea.id);
        this.tareaCompartida.setTareaActiva(undefined);
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
      }
    });
  }

}
