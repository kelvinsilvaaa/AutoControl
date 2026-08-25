package com.autocontrol.backend.controller;

import com.autocontrol.backend.model.Usuario;
import com.autocontrol.backend.security.JwtUtils;
import com.autocontrol.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtils jwtUtils;

    public AuthController(UsuarioService usuarioService, JwtUtils jwtUtils) {
        this.usuarioService = usuarioService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (usuarioService.validarCredenciais(username, password)) {
            String token = jwtUtils.generateToken(username);
            Optional<Usuario> usuario = usuarioService.buscarPorUsername(username);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("usuario", usuario.get());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Map.of("erro", "Credenciais inválidas"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String email = request.get("email");
        String nome = request.get("nome");

        if (usuarioService.buscarPorUsername(username).isPresent()) {
            return ResponseEntity.status(400).body(Map.of("erro", "Usuário já existe"));
        }

        Usuario usuario = usuarioService.criarUsuario(username, password, email, nome);
        String token = jwtUtils.generateToken(username);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", usuario);

        return ResponseEntity.ok(response);
    }
}
