import React, { useState, useEffect } from 'react';
import { veiculoAPI } from '../services/api';

export default function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    cor: '',
    quilometragem: 0,
  });

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      const response = await veiculoAPI.listarTodos();
      setVeiculos(response.data);
    } catch (err) {
      console.error('Erro ao carregar veículos:', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await veiculoAPI.atualizar(editando.id, form);
      } else {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        await veiculoAPI.criar({ ...form, usuario });
      }
      carregarVeiculos();
      setShowModal(false);
      setForm({
        placa: '',
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        cor: '',
        quilometragem: 0,
      });
      setEditando(null);
    } catch (err) {
      console.error('Erro ao salvar veículo:', err);
    }
  };

  const handleEditar = (veiculo) => {
    setForm(veiculo);
    setEditando(veiculo);
    setShowModal(true);
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este veículo?')) {
      try {
        await veiculoAPI.deletar(id);
        carregarVeiculos();
      } catch (err) {
        console.error('Erro ao deletar veículo:', err);
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
          <h1>Veículos</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditando(null);
              setForm({
                placa: '',
                marca: '',
                modelo: '',
                ano: new Date().getFullYear(),
                cor: '',
                quilometragem: 0,
              });
              setShowModal(true);
            }}
          >
            + Novo Veículo
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ano</th>
                  <th>Cor</th>
                  <th>Quilometragem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {veiculos.map((v) => (
                  <tr key={v.id}>
                    <td>{v.placa}</td>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td>{v.ano}</td>
                    <td>{v.cor}</td>
                    <td>{v.quilometragem} km</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditar(v)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletar(v.id)}
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
                  <h5 className="modal-title">{editando ? 'Editar' : 'Novo'} Veículo</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Placa</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.placa}
                        onChange={(e) => setForm({ ...form, placa: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Marca</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.marca}
                        onChange={(e) => setForm({ ...form, marca: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Modelo</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.modelo}
                        onChange={(e) => setForm({ ...form, modelo: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Ano</label>
                      <input
                        type="number"
                        className="form-control"
                        value={form.ano}
                        onChange={(e) => setForm({ ...form, ano: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Cor</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.cor}
                        onChange={(e) => setForm({ ...form, cor: e.target.value })}
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
