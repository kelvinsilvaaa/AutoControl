package com.autocontrol.backend.controller;

import com.autocontrol.backend.model.Manutencao;
import com.autocontrol.backend.model.Abastecimento;
import com.autocontrol.backend.model.Veiculo;
import com.autocontrol.backend.service.VeiculoService;
import com.autocontrol.backend.service.ManutencaoService;
import com.autocontrol.backend.service.AbastecimentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final VeiculoService veiculoService;
    private final ManutencaoService manutencaoService;
    private final AbastecimentoService abastecimentoService;

    public DashboardController(VeiculoService veiculoService, ManutencaoService manutencaoService, AbastecimentoService abastecimentoService) {
        this.veiculoService = veiculoService;
        this.manutencaoService = manutencaoService;
        this.abastecimentoService = abastecimentoService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> obterEstatisticas() {
        Map<String, Object> stats = new HashMap<>();

        List<Veiculo> veiculos = veiculoService.listarTodos();
        List<Manutencao> manutencoes = manutencaoService.listarTodas();
        List<Abastecimento> abastecimentos = abastecimentoService.listarTodos();

        BigDecimal gastoManutencao = manutencoes.stream()
                .map(Manutencao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal gastoAbastecimento = abastecimentos.stream()
                .map(Abastecimento::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal gastoTotal = gastoManutencao.add(gastoAbastecimento);

        stats.put("totalVeiculos", veiculos.size());
        stats.put("totalManutencoes", manutencoes.size());
        stats.put("gastoManutencao", gastoManutencao);
        stats.put("gastoAbastecimento", gastoAbastecimento);
        stats.put("gastoTotal", gastoTotal);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/veiculo/{veiculoId}/custo-total")
    public ResponseEntity<Map<String, Object>> obterCustoTotalVeiculo(@PathVariable Long veiculoId) {
        Map<String, Object> custo = new HashMap<>();

        BigDecimal gastoManutencao = manutencaoService.calcularGastoTotal(veiculoId);
        BigDecimal gastoAbastecimento = abastecimentoService.calcularGastoTotal(veiculoId);
        BigDecimal gastoTotal = gastoManutencao.add(gastoAbastecimento);

        custo.put("veiculo", veiculoService.buscarPorId(veiculoId));
        custo.put("gastoManutencao", gastoManutencao);
        custo.put("gastoAbastecimento", gastoAbastecimento);
        custo.put("gastoTotal", gastoTotal);

        return ResponseEntity.ok(custo);
    }
}
