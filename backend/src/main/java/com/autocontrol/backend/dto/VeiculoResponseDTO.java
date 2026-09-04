package com.autocontrol.backend.dto;

public record VeiculoResponseDTO(
        Long id,
        String placa,
        String marca,
        String modelo,
        Integer ano,
        String cor,
        Integer quilometragem
) {
}
