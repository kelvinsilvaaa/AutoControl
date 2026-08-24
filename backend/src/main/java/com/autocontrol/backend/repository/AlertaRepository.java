package com.autocontrol.backend.repository;

import com.autocontrol.backend.model.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlertaRepository extends JpaRepository<Alerta, Long> {
    List<Alerta> findByVeiculoId(Long veiculoId);
    List<Alerta> findByVeiculoIdAndAtivo(Long veiculoId, Boolean ativo);
}
