import {Component, HostListener, signal} from '@angular/core';
import {HomeComponent} from '../../components/home/home.component';
import {LeftSidebarComponent} from '../../shared/left-sidebar/left-sidebar.component';
import {TareaInterface} from '../../interface/tarea-interface';

@Component({
  selector: 'app-home-page',
  imports: [
    HomeComponent,
    LeftSidebarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }

  tareaSeleccionada?: TareaInterface;

  mostrarTarea(tarea: TareaInterface) {
    this.tareaSeleccionada = tarea;
  }

  onTareaEliminada(tareaId: number): void {
    // Limpiar la tarea activa si es la que se eliminó
      this.tareaSeleccionada = undefined;
  }
}
