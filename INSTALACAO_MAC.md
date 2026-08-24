# 🍎 Guia de Instalação do AutoControl no Mac

Siga este guia passo a passo para instalar e rodar o AutoControl no seu Mac.

## 📋 Pré-requisitos

Você precisará instalar:
1. Homebrew (gerenciador de pacotes)
2. Java 21
3. Maven
4. Node.js e npm
5. MySQL

## 🚀 Passo a Passo

### 1️⃣ Instalar Homebrew

Abra o Terminal (Cmd + Espaço, digite "Terminal") e execute:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verifique a instalação:
```bash
brew --version
```

### 2️⃣ Instalar Java 21

```bash
brew install openjdk@21
```

Configure o Java no seu sistema:
```bash
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
```

Verifique:
```bash
java -version
```

### 3️⃣ Instalar Maven

```bash
brew install maven
```

Verifique:
```bash
mvn -version
```

### 4️⃣ Instalar Node.js e npm

```bash
brew install node
```

Verifique:
```bash
node --version
npm --version
```

### 5️⃣ Instalar MySQL

```bash
brew install mysql
```

Inicie o MySQL:
```bash
brew services start mysql
```

Verifique:
```bash
mysql --version
```

### 6️⃣ Criar Banco de Dados

Abra o MySQL:
```bash
mysql -u root
```

Dentro do MySQL, execute:
```sql
CREATE DATABASE autocontrol;
EXIT;
```

Importe o script SQL:
```bash
mysql -u root autocontrol < database/script.sql
```

## 🎯 Executar o AutoControl

Abra **3 terminais diferentes**:

### Terminal 1 - Backend

```bash
cd backend
mvn spring-boot:run
```

Você verá:
```
[INFO] Started AutoControlApplication in X.XXX seconds
```

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Você verá:
```
➜  Local:   http://localhost:5173/
```

### Terminal 3 - Verificar MySQL

```bash
mysql -u root -e "SHOW DATABASES;"
```

Você deve ver `autocontrol` na lista.

## 🌐 Acessar a Aplicação

Abra seu navegador e acesse:

```
http://localhost:5173
```

### Credenciais de Teste

```
Usuário: admin
Senha: 123456
```

## ⚠️ Problemas Comuns

### ❌ "Java: command not found"

Solução:
```bash
# Reinstale Java
brew uninstall openjdk@21
brew install openjdk@21
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk

# Reinicie o terminal
```

### ❌ "Maven: command not found"

Solução:
```bash
# Reinstale Maven
brew uninstall maven
brew install maven

# Reinicie o terminal
```

### ❌ "npm: command not found"

Solução:
```bash
# Reinstale Node.js
brew uninstall node
brew install node

# Reinicie o terminal
```

### ❌ "Port 8080 already in use"

Solução:
```bash
# Encontre o processo
lsof -i :8080

# Mate o processo (substitua XXXXX pelo PID)
kill -9 XXXXX
```

### ❌ "Port 5173 already in use"

Solução:
```bash
# Encontre o processo
lsof -i :5173

# Mate o processo
kill -9 XXXXX
```

### ❌ "MySQL connection refused"

Solução:
```bash
# Inicie o MySQL
brew services start mysql

# Ou reinicie
brew services restart mysql
```

### ❌ "Access denied for user 'root'@'localhost'"

Solução:
```bash
# Resete a senha do MySQL
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '';"
```

## 📝 Resumo dos Comandos

**Iniciar MySQL:**
```bash
brew services start mysql
```

**Parar MySQL:**
```bash
brew services stop mysql
```

**Reiniciar MySQL:**
```bash
brew services restart mysql
```

**Verificar status:**
```bash
brew services list
```

## 🎓 Próximos Passos

1. Explore o Dashboard
2. Crie alguns veículos
3. Registre manutenções e abastecimentos
4. Veja os gráficos e relatórios
5. Teste todas as funcionalidades

## 💡 Dicas

- Mantenha os 3 terminais abertos enquanto estiver desenvolvendo
- Não feche os terminais ou o sistema para de funcionar
- Para parar o backend: `Ctrl + C` no Terminal 1
- Para parar o frontend: `Ctrl + C` no Terminal 2
- Para parar o MySQL: `brew services stop mysql`

## 📞 Suporte

Se tiver dúvidas, verifique:
1. Se todas as ferramentas estão instaladas corretamente
2. Se as portas 8080 e 5173 estão livres
3. Se o MySQL está rodando
4. Se o banco de dados foi criado

---

**Boa sorte! 🚀**
