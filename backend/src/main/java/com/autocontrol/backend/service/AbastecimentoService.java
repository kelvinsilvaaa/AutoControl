package com.autocontrol.backend.service;

import com.autocontrol.backend.model.Abastecimento;
import com.autocontrol.backend.repository.AbastecimentoRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class AbastecimentoService {

    private final AbastecimentoRepository abastecimentoRepository;

    public AbastecimentoService(AbastecimentoRepository abastecimentoRepository) {
        this.abastecimentoRepository = abastecimentoRepository;
    }

    public Abastecimento salvar(Abastecimento abastecimento) {
        return abastecimentoRepository.save(abastecimento);
    }

    public Optional<Abastecimento> buscarPorId(Long id) {
        return abastecimentoRepository.findById(id);
    }

    public List<Abastecimento> buscarPorVeiculo(Long veiculoId) {
        return abastecimentoRepository.findByVeiculoId(veiculoId);
    }

    public List<Abastecimento> listarTodos() {
        return abastecimentoRepository.findAll();
    }

    public BigDecimal calcularGastoTotal(Long veiculoId) {
        List<Abastecimento> abastecimentos = buscarPorVeiculo(veiculoId);
        return abastecimentos.stream()
                .map(Abastecimento::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void deletar(Long id) {
        abastecimentoRepository.deleteById(id);
    }
}
