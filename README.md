# Desafio Técnico 2 - Backend: API de Autenticação

Este repositório contém uma API RESTful de autenticação desenvolvida como parte do desafio técnico para a vaga de
Desenvolvedor Backend na Escribo Inovação para o Aprendizado.

## Descrição

A API oferece funcionalidades para cadastro de usuários (sign up), autenticação de usuários (sign in) e recuperação de
informações do usuário. Construída com o framework Express, a API utiliza MongoDB para armazenamento persistente de
dados do usuário.

## Objetivo

O objetivo desta implementação é criar uma solução robusta e segura para autenticação de usuários, permitindo operações
essenciais de gerenciamento de contas. Serão avaliados aspectos como segurança, eficiência na persistência de dados, e
conformidade com as especificações técnicas fornecidas. A eficácia do sistema será medida através de métricas de
desempenho e segurança.

## Tecnologias Utilizadas

- **Express:** Um framework web rápido, não opinativo e minimalista para Node.js. (`^4.17.1`)
- **JavaScript**
- **Jest**
- **MongoDB**
- **Node.js**
- **Yarn**

## Especificações Técnicas

### 1. Formato de comunicação

- Todos os endpoints aceitam e retornam dados no formato JSON.
- Retorno JSON para situações de endpoint não encontrado.

### 2. Persistência de Dados

- Armazenamento persistente de dados do usuário.

### 3. Respostas de Erro

- Formato padrão: `{"mensagem":"mensagem de erro"}`

## Funcionalidades

1. **Cadastro de Usuários (Sign Up):**
    - Endpoint: `/signup`
    - Método: **POST**
    - Input:
       ```json
         {
           "email": "string",
           "nome": "string",
           "senha": "senha",
           "telefones": [{"ddd": 11, "numero": 123456789}]
         }
       ```
    - Output (Sucesso):
       ```json
          {
            "id": "GUID/ID",
            "data_criacao": "data",
            "data_atualizacao": "data",
            "ultimo_login": "data",
            "token": "GUID/JWT"
          }
       ```
    - Output (Erro - E-mail já cadastrado):
       ```json
         {
           "mensagem": "E-mail já existente"
         }
       ```

2. **Autenticação de Usuários (Sign In):**
    - Endpoint: `/signin`
    - Método: **POST**
    - Input:
       ```json
         {
           "email": "string",
           "senha": "senha"      
         }
       ```
    - Output (Sucesso):
       ```json
          {
            "id": "GUID/ID",
            "data_criacao": "data",
            "data_atualizacao": "data",
            "ultimo_login": "data",
            "token": "GUID/JWT"
          }
       ```
    - Output (Erro - E-mail não cadastrado ou senha incorreta):
       ```json
         {
           "mensagem": "Usuário e/ou senha inválidos"
         }
       ```
    - Output (Erro - Senha incorreta):
       ```json
         {
           "status": "401",
           "mensagem": "Usuário e/ou senha inválidos"
         }                 
       ```

3. **Recuperação de Informações do Usuário:**
    - Endpoint: `/user/:id`
    - Método: **GET**
    - Requisição: **Header Authentication com valor "Bearer {token}"**
    - Erros:
        - Token Inválido:
           ```json
           {"mensagem": "Não autorizado"}
           ```
        - Token expirado (mais de 30 minutos):
           ```json
           {"mensagem": "Sessão inválida"}
           ```

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/viniciusvasconcelosferreira/escribo-backend-auth-challenge.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd escribo-backend-auth-challenge
   ```

3. Instale as dependências:

   ```bash
   yarn
   ```

4. Defina as configurações no arquivo .env:

    ```dotenv
    EXPRESS_ENV=development
    PORT=5000
    MONGO_REMOTE_URL=MONGO_REMOTE_URL=mongodb+srv://<username>:<password>@<name_of_cluster>.imvxrxf.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET=seu_jwt_secreto_gerado
    MONGO_LOCAL_URL=mongodb://localhost:27017/nome-do-seu-banco-local
    MONGO_LOCAL_TEST_URL=mongodb://localhost:27017/nome-do-seu-banco-local-de-testes
    ```
   Lembrando que o `JWT_SECRET` pode ser gerado usando o comando:
   
   ```bash
   yarn generate-token
   ```
5. Inicie o servidor com o nodemon:

   ```bash
   yarn start
   ```

6. Acesse a API em [http://localhost:5000](http://localhost:5000).

## Dependências Principais

- **Body Parser, Dotenv, Nodemon, Validator:** Dependências adicionais para funcionalidades específicas.
- **Express:** Um framework web rápido, não opinativo e minimalista para Node.js. (`^4.17.1`)
- **Jest:** Framework de teste para JavaScript.
- **MongoDB e Mongoose:** Utilizados para a persistência de dados.

## Testes Unitários

Este projeto utiliza o framework Jest para realizar testes unitários. Os testes estão localizados na pasta `__tests__` no diretório `src`. Abaixo estão os principais comandos para executar os testes:

### 1. Instalar Dependências de Desenvolvimento

Antes de executar os testes, certifique-se de instalar as dependências de desenvolvimento necessárias. Use o seguinte comando:

```bash
yarn install --dev
```

### 2. Executar Testes Unitários

Para executar todos os testes unitários, utilize o seguinte comando:

```bash
yarn test
```

Se preferir, você também pode usar o modo de observação para executar os testes automaticamente sempre que ocorrerem alterações no código:

```bash
yarn test:watch
```

### Observações:

- Certifique-se de que o servidor não está em execução antes de executar os testes para garantir que as portas não estejam ocupadas.

- Se precisar gerar um token JWT para testes, utilize o seguinte comando:

  ```bash
  yarn generate-token
  ```

- Certifique-se de configurar corretamente as variáveis de ambiente no arquivo `.env` antes de executar os testes.

## Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.