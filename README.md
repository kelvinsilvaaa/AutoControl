# 🚗 AutoControl - Sistema de Gestão de Veículos

Sistema completo de gestão e manutenção de veículos desenvolvido com **React 19**, **Spring Boot 3** e **MySQL 8**.

## 📋 Visão Geral

AutoControl é uma aplicação web profissional para gerenciar veículos, controlar manutenções preventivas e corretivas, registrar abastecimentos e acompanhar custos totais. Ideal para proprietários de veículos ou pequenas empresas de frotas.

## 🎯 Funcionalidades

- ✅ **Dashboard** - Visão geral com estatísticas e gráficos
- ✅ **Gestão de Veículos** - CRUD completo com placa, marca, modelo, ano, cor e quilometragem
- ✅ **Manutenções** - Registro de todas as manutenções com tipo, data, quilometragem e valor
- ✅ **Abastecimentos** - Controle de combustível com cálculo automático de consumo
- ✅ **Alertas Inteligentes** - Notificações para manutenções preventivas
- ✅ **Relatórios** - Análise de gastos por período e por veículo
- ✅ **Autenticação JWT** - Login seguro com tokens
- ✅ **Custo Total do Veículo** - Soma de manutenções + combustível

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Framework UI moderno
- **Vite** - Build tool rápido
- **Axios** - Cliente HTTP
- **React Router** - Roteamento
- **Bootstrap 5** - UI Components
- **Chart.js** - Gráficos

### Backend
- **Java 21** - Linguagem
- **Spring Boot 3** - Framework
- **Spring Security** - Autenticação
- **Spring Data JPA** - ORM
- **Hibernate** - Mapeamento objeto-relacional
- **JWT** - Tokens de autenticação
- **Maven** - Gerenciador de dependências

### Banco de Dados
- **MySQL 8** - Banco de dados relacional

## 📦 Requisitos

- **Java 21** ou superior
- **Maven 3.9+**
- **Node.js 20.x** (LTS) ou superior
- **npm** (vem com Node.js)
- **MySQL 8.0+**

## 🚀 Instalação e Execução

### 1️⃣ Configurar Banco de Dados

```bash
# Abrir MySQL
mysql -u root

# Executar o script SQL
source database/script.sql

# Sair do MySQL
exit
```

### 2️⃣ Iniciar Backend (Spring Boot)

```bash
# Navegar até a pasta backend
cd backend

# Compilar e rodar
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em: `http://localhost:8080/api`

### 3️⃣ Iniciar Frontend (React)

```bash
# Em outro terminal, navegar até a pasta frontend
cd frontend

# Instalar dependências
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## 🔐 Credenciais de Teste

```
Usuário: admin
Senha: 123456
```

## 📁 Estrutura do Projeto

```
AutoControl-Final/
├── backend/
│   ├── src/main/java/com/autocontrol/backend/
│   │   ├── model/              # Entidades JPA
│   │   ├── repository/         # Repositórios Spring Data
│   │   ├── service/            # Lógica de negócio
│   │   ├── controller/         # Endpoints REST
│   │   ├── security/           # JWT e autenticação
│   │   └── config/             # Configurações
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── pages/              # Páginas (Login, Dashboard, etc)
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── services/           # Serviços API
│   │   ├── App.jsx             # Componente principal
│   │   └── index.css           # Estilos globais
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── database/
│   └── script.sql              # Script de criação do banco
│
└── README.md
```

## 🔌 API REST Endpoints

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário

### Veículos
- `GET /api/veiculos` - Listar todos
- `GET /api/veiculos/{id}` - Buscar por ID
- `POST /api/veiculos` - Criar novo
- `PUT /api/veiculos/{id}` - Atualizar
- `DELETE /api/veiculos/{id}` - Deletar

### Manutenções
- `GET /api/manutencoes` - Listar todas
- `GET /api/manutencoes/veiculo/{veiculoId}` - Por veículo
- `POST /api/manutencoes` - Criar nova
- `PUT /api/manutencoes/{id}` - Atualizar
- `DELETE /api/manutencoes/{id}` - Deletar

### Abastecimentos
- `GET /api/abastecimentos` - Listar todos
- `GET /api/abastecimentos/veiculo/{veiculoId}` - Por veículo
- `POST /api/abastecimentos` - Criar novo
- `PUT /api/abastecimentos/{id}` - Atualizar
- `DELETE /api/abastecimentos/{id}` - Deletar

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas gerais
- `GET /api/dashboard/veiculo/{veiculoId}/custo-total` - Custo total do veículo

## 🐛 Troubleshooting

### Erro: "Porta 8080 já está em uso"
```bash
# Encontrar processo
lsof -i :8080

# Matar processo (substitua XXXXX pelo PID)
kill -9 XXXXX
```

### Erro: "Conexão recusada ao banco de dados"
- Verifique se MySQL está rodando
- Confirme as credenciais em `application.properties`
- Verifique se o banco `autocontrol` foi criado

### Erro: "npm command not found"
- Reinstale Node.js
- Reinicie o terminal

## 📊 Diagramas Técnicos

### Diagrama de Arquitetura
```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│                    http://localhost:5173                     │
└────────────────────────┬────────────────────────────────────┘
                         │ Axios HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   API REST (Spring Boot)                     │
│                    http://localhost:8080                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Controllers │ Services │ Repositories │ Security     │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ JDBC
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    MySQL Database                            │
│              usuarios, veiculos, manutencoes,               │
│              abastecimentos, alertas                         │
└─────────────────────────────────────────────────────────────┘
```

## 🔒 Segurança

- Senhas criptografadas com BCrypt
- Autenticação JWT com tokens
- CORS configurado
- Validação de entrada
- Proteção contra SQL Injection

## 📝 Licença

Este projeto é fornecido para fins acadêmicos.

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como sistema acadêmico de gestão de veículos.

---

**Última atualização:** Junho 2024
**Versão:** 1.0.0
