import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const carregarUsuario = () => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (!usuarioSalvo || usuarioSalvo === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(usuarioSalvo);
    } catch (error) {
      console.error('Usuário inválido no localStorage:', error);
      localStorage.removeItem('usuario');
      return null;
    }
  };

  const usuario = carregarUsuario();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          AutoControl
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/veiculos">
                Veículos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/manutencoes">
                Manutenções
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/abastecimentos">
                Abastecimentos
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                {usuario?.nome || 'Usuário'}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/perfil">
                    Perfil
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
