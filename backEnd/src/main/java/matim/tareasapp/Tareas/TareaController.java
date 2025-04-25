package matim.tareasapp.Tareas;

import lombok.RequiredArgsConstructor;
import matim.tareasapp.Usuario.Usuario;
import matim.tareasapp.Usuario.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tarea")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class TareaController {

    private final TareaService tareaService;
    private final UsuarioService usuarioService;

    public TareaController(TareaService tareaService, UsuarioService usuarioService) {
        this.tareaService = tareaService;
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public Tarea crearTarea(@RequestBody Tarea tarea) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Usuario usuario = usuarioService.obtenerPorUsername(username);

        tarea.setUsuario(usuario);
        return tareaService.crearTarea(tarea);
    }

    @GetMapping
    public List<Tarea> obtenerTareasUsuario() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Usuario usuario = usuarioService.obtenerPorUsername(username);

        return tareaService.obtenerTareasPorUsuario(usuario.getId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarea> actualizarTarea(@PathVariable Long id, @RequestBody Tarea nuevaTarea) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Usuario usuario = usuarioService.obtenerPorUsername(username);

        Tarea tareaExistente = tareaService.obtenerTareaPorId(id);
        if (tareaExistente == null || !tareaExistente.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        tareaExistente.setTitulo(nuevaTarea.getTitulo());
        tareaExistente.setDescripcion(nuevaTarea.getDescripcion());
        tareaExistente.setCompletada(nuevaTarea.isCompletada());

        Tarea actualizada = tareaService.actualizarTarea(tareaExistente);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTarea(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Usuario usuario = usuarioService.obtenerPorUsername(username);

        Tarea tarea = tareaService.obtenerTareaPorId(id);
        if (tarea == null || !tarea.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No autorizado para eliminar esta tarea");
        }

        tareaService.eliminarTarea(id);
        return ResponseEntity.ok().build();
    }




}
