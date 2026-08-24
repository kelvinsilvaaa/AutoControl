package com.autocontrol.backend.service;

import com.autocontrol.backend.model.Manutencao;
import com.autocontrol.backend.repository.ManutencaoRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;

    public ManutencaoService(ManutencaoRepository manutencaoRepository) {
        this.manutencaoRepository = manutencaoRepository;
    }

    public Manutencao salvar(Manutencao manutencao) {
        return manutencaoRepository.save(manutencao);
    }

    public Optional<Manutencao> buscarPorId(Long id) {
        return manutencaoRepository.findById(id);
    }

    public List<Manutencao> buscarPorVeiculo(Long veiculoId) {
        return manutencaoRepository.findByVeiculoId(veiculoId);
    }

    public List<Manutencao> listarTodas() {
        return manutencaoRepository.findAll();
    }

    public BigDecimal calcularGastoTotal(Long veiculoId) {
        List<Manutencao> manutencoes = buscarPorVeiculo(veiculoId);
        return manutencoes.stream()
                .map(Manutencao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void deletar(Long id) {
        manutencaoRepository.deleteById(id);
    }
}
