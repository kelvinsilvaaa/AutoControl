package com.autocontrol.backend.service;

import com.autocontrol.backend.dto.VeiculoResponseDTO;

import com.autocontrol.backend.model.Veiculo;
import com.autocontrol.backend.repository.VeiculoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;

    public VeiculoService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    public Veiculo salvar(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }

    public Optional<Veiculo> buscarPorId(Long id) {
        return veiculoRepository.findById(id);
    }

    public List<Veiculo> buscarPorUsuario(Long usuarioId) {
        return veiculoRepository.findByUsuarioId(usuarioId);
    }

    public List<VeiculoResponseDTO> listarTodos() {
        return veiculoRepository.findAll()
                .stream()
                .map(veiculo -> new VeiculoResponseDTO(
                        veiculo.getId(),
                        veiculo.getPlaca(),
                        veiculo.getMarca(),
                        veiculo.getModelo(),
                        veiculo.getAno(),
                        veiculo.getCor(),
                        veiculo.getQuilometragem()
                ))
                .toList();
    }

    public void deletar(Long id) {
        veiculoRepository.deleteById(id);
    }
}
