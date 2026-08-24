package com.autocontrol.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "alertas")
public class Alerta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @Column(nullable = false)
    private String tipo; // "Óleo", "Revisão", "Pneus"

    @Column(nullable = false)
    private Integer quilometragemAlerta;

    @Column(nullable = false)
    private Boolean ativo = true;

    // Construtores
    public Alerta() {}

    public Alerta(Veiculo veiculo, String tipo, Integer quilometragemAlerta) {
        this.veiculo = veiculo;
        this.tipo = tipo;
        this.quilometragemAlerta = quilometragemAlerta;
        this.ativo = true;
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

    public Integer getQuilometragemAlerta() {
        return quilometragemAlerta;
    }

    public void setQuilometragemAlerta(Integer quilometragemAlerta) {
        this.quilometragemAlerta = quilometragemAlerta;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
