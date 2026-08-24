import React, { useState, useEffect } from 'react';
import { abastecimentoAPI, veiculoAPI } from '../services/api';

export default function Abastecimentos() {
  const [abastecimentos, setAbastecimentos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState({
    veiculo: null,
    data: new Date().toISOString().split('T')[0],
    combustivel: 'Gasolina',
    litros: 0,
    valor: 0,
    quilometragem: 0,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [abastRes, veicRes] = await Promise.all([
        abastecimentoAPI.listarTodos(),
        veiculoAPI.listarTodos(),
      ]);
      setAbastecimentos(abastRes.data);
      setVeiculos(veicRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await abastecimentoAPI.atualizar(editando.id, form);
      } else {
        await abastecimentoAPI.criar(form);
      }
      carregarDados();
      setShowModal(false);
      setForm({
        veiculo: null,
        data: new Date().toISOString().split('T')[0],
        combustivel: 'Gasolina',
        litros: 0,
        valor: 0,
        quilometragem: 0,
      });
      setEditando(null);
    } catch (err) {
      console.error('Erro ao salvar abastecimento:', err);
    }
  };

  const handleEditar = (abastecimento) => {
    setForm(abastecimento);
    setEditando(abastecimento);
    setShowModal(true);
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este abastecimento?')) {
      try {
        await abastecimentoAPI.deletar(id);
        carregarDados();
      } catch (err) {
        console.error('Erro ao deletar abastecimento:', err);
      }
    }
  };

  if (carregando) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  return (
    <div className="container-main">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Abastecimentos</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditando(null);
              setForm({
                veiculo: null,
                data: new Date().toISOString().split('T')[0],
                combustivel: 'Gasolina',
                litros: 0,
                valor: 0,
                quilometragem: 0,
              });
              setShowModal(true);
            }}
          >
            + Novo Abastecimento
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Veículo</th>
                  <th>Data</th>
                  <th>Combustível</th>
                  <th>Litros</th>
                  <th>Valor</th>
                  <th>Quilometragem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {abastecimentos.map((a) => (
                  <tr key={a.id}>
                    <td>{a.veiculo?.placa}</td>
                    <td>{new Date(a.data).toLocaleDateString('pt-BR')}</td>
                    <td>{a.combustivel}</td>
                    <td>{parseFloat(a.litros).toFixed(2)} L</td>
                    <td>R$ {parseFloat(a.valor).toFixed(2)}</td>
                    <td>{a.quilometragem} km</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditar(a)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletar(a.id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editando ? 'Editar' : 'Novo'} Abastecimento</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Veículo</label>
                      <select
                        className="form-control"
                        value={form.veiculo?.id || ''}
                        onChange={(e) => {
                          const veiculo = veiculos.find(v => v.id == e.target.value);
                          setForm({ ...form, veiculo });
                        }}
                        required
                      >
                        <option value="">Selecione um veículo</option>
                        {veiculos.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.placa} - {v.marca} {v.modelo}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Data</label>
                      <input
                        type="date"
                        className="form-control"
                        value={form.data}
                        onChange={(e) => setForm({ ...form, data: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Combustível</label>
                      <select
                        className="form-control"
                        value={form.combustivel}
                        onChange={(e) => setForm({ ...form, combustivel: e.target.value })}
                      >
                        <option>Gasolina</option>
                        <option>Diesel</option>
                        <option>Álcool</option>
                        <option>Gás</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Litros</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={form.litros}
                        onChange={(e) => setForm({ ...form, litros: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Valor</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={form.valor}
                        onChange={(e) => setForm({ ...form, valor: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quilometragem</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.quilometragem}
                        onChange={(e) => setForm({ ...form, quilometragem: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
