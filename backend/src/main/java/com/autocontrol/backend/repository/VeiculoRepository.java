package com.autocontrol.backend.repository;

import com.autocontrol.backend.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    List<Veiculo> findByUsuarioId(Long usuarioId);
}
