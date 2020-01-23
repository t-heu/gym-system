## GYMPOINT RESTful API

Este é um desafio proposto no Bootcamp Omnistack9 da RocketSeat.

Uma aplicação backend para cadastro e atualização de informações de usuários, check-in, e pedidos de ajuda de uma academia fictícia, utilizando os conceitos ensinados no módulo de **NodeJs**.

- Linting com **Eslint** nos padrões **AirBnB**
- **Prettier**
- **Sucrase** (transpiler rápido)
- Dev served with **Nodemon**
- Criação de Rotas com **ExpressJs**
- Base de Dados com **Docker** Local e **Postgres**
- **Sequelize** nos models e **migrations**
- **mongoDb**
- **Encriptação** de senhas com **bcryptjs**
- Autenticação de usuário com **JWT (JsonWebToken)**
- Tudo rodando localmente em containers no **Docker**
- Processamento de datas com **date-fns**
- Envio de emails e notificações com **nodemailer**
- Teste com **MailTrap**
- Templates de emails com **handle-bars**
- Filas de processamento com **Bee-Queue** e **redis**
- Tratamento de Exceções em ambiente de desenvolvimento com **Sentry** e **Youch**
- Variaveis de ambiente com **dotenv**


## Para rodar

Em primeiro lugar certifique-se de ter instalado em sua máquina e contas em serviços de terceiros:

- **NodeJs**
- **Yarn**
- **Docker** e/ou Dbs **Postgres**, **MongoDb** e **Redis**
- Uma conta no **Mailtrap** ou outro email tester para Node
- Uma conta no **Sentry.io** para tratamento de exceções

`yarn install` ou `npm install`

### Ambiente Dev

`yarn build:js`
isso irá rodar os dois comandos abaixo, se prefeir pode seguir manualmente como:

`yarn dev` ou `npm run dev`
`yarn queue` ou `npm run queue`

Ao mesmo tempo você deve abrir outro terminal e digitar o comando para rodar a fila de jobs para envio de notificações.
