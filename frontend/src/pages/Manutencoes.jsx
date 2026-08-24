import React, { useState, useEffect } from 'react';
import { manutencaoAPI, veiculoAPI } from '../services/api';

export default function Manutencoes() {
  const [manutencoes, setManutencoes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState({
    veiculo: null,
    tipo: 'Troca de Óleo',
    data: new Date().toISOString().split('T')[0],
    quilometragem: 0,
    valor: 0,
    descricao: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [manutRes, veicRes] = await Promise.all([
        manutencaoAPI.listarTodas(),
        veiculoAPI.listarTodos(),
      ]);
      setManutencoes(manutRes.data);
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
        await manutencaoAPI.atualizar(editando.id, form);
      } else {
        await manutencaoAPI.criar(form);
      }
      carregarDados();
      setShowModal(false);
      setForm({
        veiculo: null,
        tipo: 'Troca de Óleo',
        data: new Date().toISOString().split('T')[0],
        quilometragem: 0,
        valor: 0,
        descricao: '',
      });
      setEditando(null);
    } catch (err) {
      console.error('Erro ao salvar manutenção:', err);
    }
  };

  const handleEditar = (manutencao) => {
    setForm(manutencao);
    setEditando(manutencao);
    setShowModal(true);
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta manutenção?')) {
      try {
        await manutencaoAPI.deletar(id);
        carregarDados();
      } catch (err) {
        console.error('Erro ao deletar manutenção:', err);
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
          <h1>Manutenções</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditando(null);
              setForm({
                veiculo: null,
                tipo: 'Troca de Óleo',
                data: new Date().toISOString().split('T')[0],
                quilometragem: 0,
                valor: 0,
                descricao: '',
              });
              setShowModal(true);
            }}
          >
            + Nova Manutenção
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Veículo</th>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th>Quilometragem</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {manutencoes.map((m) => (
                  <tr key={m.id}>
                    <td>{m.veiculo?.placa}</td>
                    <td>{m.tipo}</td>
                    <td>{new Date(m.data).toLocaleDateString('pt-BR')}</td>
                    <td>{m.quilometragem} km</td>
                    <td>R$ {parseFloat(m.valor).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditar(m)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletar(m.id)}
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
                  <h5 className="modal-title">{editando ? 'Editar' : 'Nova'} Manutenção</h5>
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
                      <label className="form-label">Tipo</label>
                      <select
                        className="form-control"
                        value={form.tipo}
                        onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                      >
                        <option>Troca de Óleo</option>
                        <option>Pneus</option>
                        <option>Freios</option>
                        <option>Suspensão</option>
                        <option>Elétrica</option>
                        <option>Motor</option>
                        <option>Revisão</option>
                        <option>Outros</option>
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
                      <label className="form-label">Quilometragem</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.quilometragem}
                        onChange={(e) => setForm({ ...form, quilometragem: parseInt(e.target.value) })}
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
                      <label className="form-label">Descrição</label>
                      <textarea
                        className="form-control"
                        value={form.descricao}
                        onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                        rows="3"
                      ></textarea>
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
