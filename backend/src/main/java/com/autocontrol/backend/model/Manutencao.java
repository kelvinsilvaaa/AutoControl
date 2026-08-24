package com.autocontrol.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.math.BigDecimal;

@Entity
@Table(name = "manutencoes")
public class Manutencao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private Integer quilometragem;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(length = 500)
    private String descricao;

    // Construtores
    public Manutencao() {}

    public Manutencao(Veiculo veiculo, String tipo, LocalDate data, Integer quilometragem, BigDecimal valor, String descricao) {
        this.veiculo = veiculo;
        this.tipo = tipo;
        this.data = data;
        this.quilometragem = quilometragem;
        this.valor = valor;
        this.descricao = descricao;
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getQuilometragem() {
        return quilometragem;
    }

    public void setQuilometragem(Integer quilometragem) {
        this.quilometragem = quilometragem;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
