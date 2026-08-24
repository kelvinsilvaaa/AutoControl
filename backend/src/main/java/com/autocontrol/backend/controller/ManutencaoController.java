package com.autocontrol.backend.controller;

import com.autocontrol.backend.model.Manutencao;
import com.autocontrol.backend.service.ManutencaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/manutencoes")
@CrossOrigin(origins = "http://localhost:5173")
public class ManutencaoController {

    private final ManutencaoService manutencaoService;

    public ManutencaoController(ManutencaoService manutencaoService) {
        this.manutencaoService = manutencaoService;
    }

    @GetMapping
    public ResponseEntity<List<Manutencao>> listarTodas() {
        return ResponseEntity.ok(manutencaoService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manutencao> buscarPorId(@PathVariable Long id) {
        Optional<Manutencao> manutencao = manutencaoService.buscarPorId(id);
        return manutencao.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/veiculo/{veiculoId}")
    public ResponseEntity<List<Manutencao>> buscarPorVeiculo(@PathVariable Long veiculoId) {
        return ResponseEntity.ok(manutencaoService.buscarPorVeiculo(veiculoId));
    }

    @PostMapping
    public ResponseEntity<Manutencao> criar(@RequestBody Manutencao manutencao) {
        return ResponseEntity.ok(manutencaoService.salvar(manutencao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manutencao> atualizar(@PathVariable Long id, @RequestBody Manutencao manutencaoAtualizada) {
        Optional<Manutencao> manutencao = manutencaoService.buscarPorId(id);
        if (manutencao.isPresent()) {
            Manutencao m = manutencao.get();
            m.setTipo(manutencaoAtualizada.getTipo());
            m.setData(manutencaoAtualizada.getData());
            m.setQuilometragem(manutencaoAtualizada.getQuilometragem());
            m.setValor(manutencaoAtualizada.getValor());
            m.setDescricao(manutencaoAtualizada.getDescricao());
            return ResponseEntity.ok(manutencaoService.salvar(m));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        manutencaoService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
