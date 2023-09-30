# Confeitaria 

## Descrição do Projeto

<p align="justify"> 
  A idéia inicial surgiu da profissão da minha sogra, que é confeiteira. Ela e minha noiva planejam, quem sabe, um dia ter uma confeitaria.
  Então, como uma forma de praticar meus conhecimentos, resolvi planejar e desenvolver um sistema para gerenciá-la.
</p>

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [JWT](https://jwt.io/)

- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

- [React](https://pt-br.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

- [Vitest](https://vitest.dev)

## Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)
e um navegador para visualizar a aplicação: 

- [Microsoft Edge](https://www.microsoft.com/pt-br/edge)
- [Google Chrome](https://www.google.com/intl/pt-BR/chrome/)
- [Mozilla Firefox](https://www.mozilla.org/pt-BR/firefox/new/)


### 🎲 Rodando o Back End (servidor)
  
  ```bash
  # Clone este repositório
  $ git clone https://github.com/ghgarayo/projeto-confeitaria.git

  # Acesse a pasta do projeto no terminal/cmd
  $ cd projeto-confeitaria/server

  # Instale as dependências
  $ npm install

  # Execute a aplicação em modo de desenvolvimento
  $ npm run start:dev

  # O servidor inciará na porta:3000 caso não especificado no arquivo .env - acesse <http://localhost:3000>
  ```

### 🎲 Rodando o Front End (cliente)

  ```bash
  # Acesse a pasta do projeto no terminal/cmd
  $ cd projeto-confeitaria/web

  # Instale as dependências
  $ npm install

  # Execute a aplicação em modo de desenvolvimento
  $ 

  # O servidor inciará na porta:3001 caso não especificado no arquivo .env - acesse <http://localhost:3001>
  ```


### 🎲 Rodando o Banco de Dados (PostgreSQL)

  ```bash
  # Acesse a pasta do projeto no terminal/cmd
  $ cd projeto-confeitaria

  # Execute o docker-compose
  $ docker-compose up -d

  # O servidor inciará na porta:5432
  ```






