package com.autocontrol.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "abastecimentos")
public class Abastecimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private String combustivel;

    @Column(nullable = false)
    private BigDecimal litros;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(nullable = false)
    private Integer quilometragem;

    // Construtores
    public Abastecimento() {}

    public Abastecimento(Veiculo veiculo, LocalDate data, String combustivel, BigDecimal litros, BigDecimal valor, Integer quilometragem) {
        this.veiculo = veiculo;
        this.data = data;
        this.combustivel = combustivel;
        this.litros = litros;
        this.valor = valor;
        this.quilometragem = quilometragem;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Veiculo getVeiculo() {
        return veiculo;
    }

    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getCombustivel() {
        return combustivel;
    }

    public void setCombustivel(String combustivel) {
        this.combustivel = combustivel;
    }

    public BigDecimal getLitros() {
        return litros;
    }

    public void setLitros(BigDecimal litros) {
        this.litros = litros;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Integer getQuilometragem() {
        return quilometragem;
    }

    public void setQuilometragem(Integer quilometragem) {
        this.quilometragem = quilometragem;
    }

    // Cálculo de consumo médio
    public BigDecimal calcularConsumoMedio(Integer quilometragemAnterior) {
        if (quilometragemAnterior == null || quilometragemAnterior == 0) {
            return BigDecimal.ZERO;
        }
        Integer distancia = this.quilometragem - quilometragemAnterior;
        if (distancia <= 0) {
            return BigDecimal.ZERO;
        }
        return this.litros.divide(new BigDecimal(distancia), 2, java.math.RoundingMode.HALF_UP);
    }

    // Cálculo de custo por km
    public BigDecimal calcularCustoPorKm(Integer quilometragemAnterior) {
        if (quilometragemAnterior == null || quilometragemAnterior == 0) {
            return BigDecimal.ZERO;
        }
        Integer distancia = this.quilometragem - quilometragemAnterior;
        if (distancia <= 0) {
            return BigDecimal.ZERO;
        }
        return this.valor.divide(new BigDecimal(distancia), 2, java.math.RoundingMode.HALF_UP);
    }
}
