package com.autocontrol.backend.dto;

public record LoginResponseDTO(
        Long id,
        String username,
        String nome,
        String token
) {
}
