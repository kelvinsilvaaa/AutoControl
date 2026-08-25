package com.autocontrol.backend.service;

import com.autocontrol.backend.model.Usuario;
import com.autocontrol.backend.repository.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Collections;

@Service
public class UsuarioService implements UserDetailsService {

    private static final Logger log =
            LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario criarUsuario(String username, String password, String email, String nome) {
        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setEmail(email);
        usuario.setNome(nome);
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean validarCredenciais(String username, String password) {
        log.debug("Validando credenciais do usuario:{}", username);

        Optional<Usuario> usuario = buscarPorUsername(username);

        if (usuario.isEmpty()) {
            log.warn("Falha de autenticação: usuário não encontrado: {}", username);
            return false;
        }

        boolean senhaValida = passwordEncoder.matches(password, usuario.get().getPassword());
        if (!senhaValida) {
            log.warn("Falha de autenticação: senha invalida: {}", username);
        }

        return senhaValida;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Usuário não encontrado"));

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }

}
