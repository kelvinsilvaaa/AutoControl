package com.autocontrol.backend.controller;

import com.autocontrol.backend.model.Abastecimento;
import com.autocontrol.backend.service.AbastecimentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/abastecimentos")
//@CrossOrigin(origins = "http://localhost:5173")
public class AbastecimentoController {

    private final AbastecimentoService abastecimentoService;

    public AbastecimentoController(AbastecimentoService abastecimentoService) {
        this.abastecimentoService = abastecimentoService;
    }

    @GetMapping
    public ResponseEntity<List<Abastecimento>> listarTodos() {
        return ResponseEntity.ok(abastecimentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Abastecimento> buscarPorId(@PathVariable Long id) {
        Optional<Abastecimento> abastecimento = abastecimentoService.buscarPorId(id);
        return abastecimento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/veiculo/{veiculoId}")
    public ResponseEntity<List<Abastecimento>> buscarPorVeiculo(@PathVariable Long veiculoId) {
        return ResponseEntity.ok(abastecimentoService.buscarPorVeiculo(veiculoId));
    }

    @PostMapping
    public ResponseEntity<Abastecimento> criar(@RequestBody Abastecimento abastecimento) {
        return ResponseEntity.ok(abastecimentoService.salvar(abastecimento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abastecimento> atualizar(@PathVariable Long id, @RequestBody Abastecimento abastecimentoAtualizado) {
        Optional<Abastecimento> abastecimento = abastecimentoService.buscarPorId(id);
        if (abastecimento.isPresent()) {
            Abastecimento a = abastecimento.get();
            a.setData(abastecimentoAtualizado.getData());
            a.setCombustivel(abastecimentoAtualizado.getCombustivel());
            a.setLitros(abastecimentoAtualizado.getLitros());
            a.setValor(abastecimentoAtualizado.getValor());
            a.setQuilometragem(abastecimentoAtualizado.getQuilometragem());
            return ResponseEntity.ok(abastecimentoService.salvar(a));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        abastecimentoService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
