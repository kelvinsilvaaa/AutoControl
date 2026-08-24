import React, { useState, useEffect } from 'react';
import { dashboardAPI, veiculoAPI } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [statsRes, veiculosRes] = await Promise.all([
        dashboardAPI.obterEstatisticas(),
        veiculoAPI.listarTodos(),
      ]);
      setStats(statsRes.data);
      setVeiculos(veiculosRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return <div className="loading"><div className="spinner"></div></div>;
  }

  const chartData = {
    labels: ['Manutenção', 'Abastecimento'],
    datasets: [{
      data: [
        parseFloat(stats?.gastoManutencao || 0),
        parseFloat(stats?.gastoAbastecimento || 0),
      ],
      backgroundColor: ['#4361EE', '#F72585'],
    }],
  };

  return (
    <div className="container-main">
      <div className="container">
        <h1 className="mb-4">Dashboard</h1>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="dashboard-card">
              <h5>Total de Veículos</h5>
              <div className="value">{stats?.totalVeiculos || 0}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card">
              <h5>Total de Manutenções</h5>
              <div className="value">{stats?.totalManutencoes || 0}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card">
              <h5>Gasto em Manutenção</h5>
              <div className="value">R$ {parseFloat(stats?.gastoManutencao || 0).toFixed(2)}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="dashboard-card">
              <h5>Gasto Total</h5>
              <div className="value">R$ {parseFloat(stats?.gastoTotal || 0).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Distribuição de Gastos</h5>
              </div>
              <div className="card-body">
                <Pie data={chartData} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Veículos Registrados</h5>
              </div>
              <div className="card-body">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Placa</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {veiculos.map((v) => (
                      <tr key={v.id}>
                        <td>{v.placa}</td>
                        <td>{v.marca}</td>
                        <td>{v.modelo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
