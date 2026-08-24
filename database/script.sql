-- ========================================
-- AutoControl - Script de Criação do Banco
-- ========================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS autocontrol;
USE autocontrol;

-- ========================================
-- Tabela de Usuários
-- ========================================
CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  nome VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- Tabela de Veículos
-- ========================================
CREATE TABLE veiculos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT NOT NULL,
  placa VARCHAR(20) NOT NULL UNIQUE,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INT NOT NULL,
  cor VARCHAR(50),
  quilometragem INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- ========================================
-- Tabela de Manutenções
-- ========================================
CREATE TABLE manutencoes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  veiculo_id BIGINT NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  data DATE NOT NULL,
  quilometragem INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

-- ========================================
-- Tabela de Abastecimentos
-- ========================================
CREATE TABLE abastecimentos (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  veiculo_id BIGINT NOT NULL,
  data DATE NOT NULL,
  combustivel VARCHAR(50) NOT NULL,
  litros DECIMAL(10, 2) NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  quilometragem INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

-- ========================================
-- Tabela de Alertas
-- ========================================
CREATE TABLE alertas (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  veiculo_id BIGINT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  quilometragem_alerta INT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (veiculo_id) REFERENCES veiculos(id) ON DELETE CASCADE
);

-- ========================================
-- Inserir Usuário de Teste
-- ========================================
INSERT INTO usuarios (username, password, email, nome) VALUES 
('admin', '$2a$10$slYQmyNdGzin7olVN3p5Be7DlH.PKZbv5H8KnzzVgXXbVxzy2QIDM', 'admin@autocontrol.com', 'Administrador');

-- ========================================
-- Inserir Veículos de Teste
-- ========================================
INSERT INTO veiculos (usuario_id, placa, marca, modelo, ano, cor, quilometragem) VALUES 
(1, 'ABC-1234', 'Chevrolet', 'Vectra GT', 2010, 'Preto', 150000),
(1, 'XYZ-5678', 'Volkswagen', 'Gol', 2015, 'Branco', 85000),
(1, 'DEF-9012', 'Fiat', 'Uno', 2012, 'Vermelho', 120000);

-- ========================================
-- Inserir Manutenções de Teste
-- ========================================
INSERT INTO manutencoes (veiculo_id, tipo, data, quilometragem, valor, descricao) VALUES 
(1, 'Troca de Óleo', '2024-01-15', 150000, 150.00, 'Troca de óleo e filtro'),
(1, 'Revisão', '2024-02-20', 151500, 500.00, 'Revisão completa do veículo'),
(1, 'Freios', '2024-03-10', 152000, 800.00, 'Substituição de pastilhas de freio'),
(2, 'Troca de Óleo', '2024-01-25', 85000, 120.00, 'Troca de óleo e filtro'),
(2, 'Pneus', '2024-02-15', 85500, 600.00, 'Substituição de pneus'),
(3, 'Troca de Óleo', '2024-01-20', 120000, 100.00, 'Troca de óleo e filtro');

-- ========================================
-- Inserir Abastecimentos de Teste
-- ========================================
INSERT INTO abastecimentos (veiculo_id, data, combustivel, litros, valor, quilometragem) VALUES 
(1, '2024-01-10', 'Gasolina', 45.00, 270.00, 149500),
(1, '2024-01-20', 'Gasolina', 50.00, 300.00, 150000),
(1, '2024-02-05', 'Gasolina', 48.00, 288.00, 151000),
(2, '2024-01-12', 'Gasolina', 40.00, 240.00, 84500),
(2, '2024-01-28', 'Gasolina', 42.00, 252.00, 85000),
(3, '2024-01-15', 'Gasolina', 50.00, 300.00, 119500),
(3, '2024-02-01', 'Gasolina', 48.00, 288.00, 120000);

-- ========================================
-- Inserir Alertas de Teste
-- ========================================
INSERT INTO alertas (veiculo_id, tipo, quilometragem_alerta, ativo) VALUES 
(1, 'Óleo', 155000, TRUE),
(1, 'Revisão', 160000, TRUE),
(1, 'Pneus', 165000, TRUE),
(2, 'Óleo', 90000, TRUE),
(2, 'Revisão', 95000, TRUE),
(3, 'Óleo', 125000, TRUE);

-- ========================================
-- Criar Índices
-- ========================================
CREATE INDEX idx_veiculos_usuario ON veiculos(usuario_id);
CREATE INDEX idx_manutencoes_veiculo ON manutencoes(veiculo_id);
CREATE INDEX idx_abastecimentos_veiculo ON abastecimentos(veiculo_id);
CREATE INDEX idx_alertas_veiculo ON alertas(veiculo_id);

-- ========================================
-- Fim do Script
-- ========================================
