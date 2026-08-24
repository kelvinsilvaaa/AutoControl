package com.autocontrol.backend.repository;

import com.autocontrol.backend.model.Abastecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AbastecimentoRepository extends JpaRepository<Abastecimento, Long> {
    List<Abastecimento> findByVeiculoId(Long veiculoId);
}
