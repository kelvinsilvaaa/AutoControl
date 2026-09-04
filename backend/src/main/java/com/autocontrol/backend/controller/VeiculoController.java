package com.autocontrol.backend.controller;

import com.autocontrol.backend.dto.VeiculoResponseDTO;
import com.autocontrol.backend.model.Veiculo;
import com.autocontrol.backend.service.VeiculoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veiculos")
//@CrossOrigin(origins = "http://localhost:5173")
public class VeiculoController {

    private final VeiculoService veiculoService;

    public VeiculoController(VeiculoService veiculoService) {
        this.veiculoService = veiculoService;
    }

    @GetMapping
    public ResponseEntity<List<VeiculoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(veiculoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        Optional<Veiculo> veiculo = veiculoService.buscarPorId(id);
        return veiculo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Veiculo>> buscarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(veiculoService.buscarPorUsuario(usuarioId));
    }

    @PostMapping
    public ResponseEntity<Veiculo> criar(@RequestBody Veiculo veiculo) {
        return ResponseEntity.ok(veiculoService.salvar(veiculo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @RequestBody Veiculo veiculoAtualizado) {
        Optional<Veiculo> veiculo = veiculoService.buscarPorId(id);
        if (veiculo.isPresent()) {
            Veiculo v = veiculo.get();
            v.setPlaca(veiculoAtualizado.getPlaca());
            v.setMarca(veiculoAtualizado.getMarca());
            v.setModelo(veiculoAtualizado.getModelo());
            v.setAno(veiculoAtualizado.getAno());
            v.setCor(veiculoAtualizado.getCor());
            v.setQuilometragem(veiculoAtualizado.getQuilometragem());
            return ResponseEntity.ok(veiculoService.salvar(v));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        veiculoService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
