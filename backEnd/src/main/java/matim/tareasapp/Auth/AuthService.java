package matim.tareasapp.Auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import matim.tareasapp.Jwt.JwtService;
import matim.tareasapp.Usuario.Role;
import matim.tareasapp.Usuario.UserRepository;
import matim.tareasapp.Usuario.Usuario;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse login(LoginRequest request, HttpServletResponse response) {
        // Autenticar usuario
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // Buscar usuario en la base de datos
        UserDetails user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Generar el token JWT
        String token = jwtService.getToken(user);

        // Configurar la cookie con el token
        Cookie jwtCookie = new Cookie("token", token);
        jwtCookie.setHttpOnly(true); // Evita acceso desde JavaScript (seguridad contra XSS)
        jwtCookie.setSecure(true); // Solo se envía por HTTPS (cambiar a false en desarrollo si usas HTTP)
        jwtCookie.setPath("/"); // Disponible en toda la aplicación
        jwtCookie.setMaxAge(60 * 60 * 24); // Expira en 1 día (86400 segundos)

        // Agregar la cookie a la respuesta
        response.addCookie(jwtCookie);

        // Opcional: Puedes devolver solo un mensaje sin el token en el cuerpo
        return new AuthResponse("Autenticación exitosa");
    }


    public AuthResponse register(RegisterRequest request) {

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        Usuario usuario = new Usuario(
                request.getUsername(),
                hashedPassword,
                request.getName(),
                Role.USER
        );


        userRepository.save(usuario);

        return new AuthResponse(jwtService.getToken(usuario));

    }
}
