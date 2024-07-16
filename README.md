# Projeto de Gestão de Contratos

Este projeto é uma aplicação de gestão de contratos. No estado atual do projeto, é possível adicionar novos contratoscom suas especificações e anexar o arquivo pdf, onde sera realizado uma prévia do assunto.
## Funcionalidades


- Visualização de detalhes de contratos
- Criação de novos contratos
- Atualização de contratos existentes
- Exclusão de contratos

## Tecnologias Utilizadas

### Backend

- Node.js
- Express
- Knex.js
- Objection.js
- MySQL
- bcryptjs (para hash de senhas)
- jsonwebtoken (para autenticação JWT)
- multer (para upload de arquivos)
- pdf-parse (para extração de texto de PDFs)

### Frontend

- Vue.js
- Axios
- Vite

## Configuração do Ambiente

### Pré-requisitos

- Node.js e npm instalados
- MySQL instalado

### Configuração do Backend

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/desafio_gestao_contratos.git
    cd desafio_gestao_contratos/backend
    ```

2. Instale as dependências do backend:

    ```bash
    npm install
    ```

3. Configure o banco de dados MySQL:

    - Crie um banco de dados MySQL.
    - Configure as credenciais do banco de dados no arquivo `knexfile.js`.

4. Execute as migrações para criar as tabelas:

    ```bash
    npx knex migrate:latest
    ```

5. Inicie o servidor backend:

    ```bash
    npm start
    ```

### Configuração do Frontend

1. Navegue até a pasta do frontend:

    ```bash
    cd ../frontend
    ```

2. Instale as dependências do frontend:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento do frontend:

    ```bash
    npm run dev
    ```

## Estrutura do Projeto

