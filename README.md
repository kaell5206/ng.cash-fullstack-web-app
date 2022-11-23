
# NG.Cash a carteira virtual da Nova Geração

NG Cash é uma carteira digital da nova geração, onde seu intuito é dar liberdade 
e educação financeira aos seus usuários.

Nessa aplicação web é possível fazer o cadastro de usuários, login, e realizar operações
cash in e cash out.

como a própria NG.Cash se descreve:

"Somos a carteira digital da Nova Geração.

Viemos te ajudar a construir a sua independência financeira.

Vivemos o novo, transformando o futuro. Afinal, depois do ponto, vem um novo começo."



## Finalidade do projeto.

Esse projeto foi desenvolvido como uma etapa de desafio técnico no processo seletivo
para me tornar um Dev na NG.Cash.


## Instalação

Para instalar o projeto siga os passos abaixo:


Apos extrair o arquivo e abrir a pasta no VS Code abra o terminal.

Dentro da pasta /ng.cash-fullstack-web-app siga esses passos.

Vamos instalar as dependencias necessarias rodando o script:
```bash
     npm install 
```

Apos a instalação das dependencias vamos buildar nossos serviços no docker, execute o script:
```bash
    npm run compose:up
```

Depois que o docker-compose terminar de rodar teremos nossa aplicação quase pronta.
Agora falta apenas criar as tabelas do banco de dados, execute o script:
```bash
    npm run migrate
```
Com isso nosso banco de dados agora está com todas as tabelas necessarias para utilizar
a nossa aplicação.

Entre nesse endereço para utilizar o site.
```bash
    http://localhost:3000/
```
    
## Informações uteis

Dentro da pasta raiz do projeto temos um script para resetar o banco de dado caso seja
necessário:

Rode o script:

```bash
    npm run migrate:undo
```

Quando fazemos a migration para o banco de dados também criamos um usuário para poder testar
a transferência sem precisar deslogar novamente e criar um novo user.

```bash
    username: fulanoSilva
    password: Fulanosenha1
```
## Rodando os testes

Durante o desenvolvimento do projeto eu consegui fazer alguns tests 
para o back-end da aplicação mas não pude testar todas as partes da aplicação.

Para rodar os testes, rode o seguinte comando na pasta raiz do projeto

```bash
  npm run test:coverage
```
## Stack utilizada

**Front-end:** React, TypeScript, CSS

**Back-end:** Node, TypeScript, Sequelize, Express

**Banco de dados:** PostgreSQL



