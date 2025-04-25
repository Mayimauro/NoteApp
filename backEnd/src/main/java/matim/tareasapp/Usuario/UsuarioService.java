package matim.tareasapp.Usuario;

import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UserRepository usuarioRepository;

    public UsuarioService(UserRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Usuario obtenerPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
