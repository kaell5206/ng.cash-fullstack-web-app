import chai from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';

import { app } from '../app';

import User from '../database/models/user'
import UserService from '../Services/userService';
import Token from '../Services/authService';
import AccountService from '../Services/accountService';


chai.use(chaiHttp);
const { expect } = chai;

describe('User Route', () => {
  beforeEach(() => {
    sinon.restore()
    });
  describe('create', () => {
    it('Espera retornar status 409 se usuário já existir no banco de dados', async () => {
      const payload = { 
        username: "novousuario",
        password: "Minhasenha1"
      };
      sinon.stub(User, 'findOne').resolves(payload as any)
      const response = await chai.request(app).post('/user/register').send(payload)

      expect(response.status).to.equal(409)
      expect(response.body.message).to.be.equal('Usuario já existe.')  
           
    });
    it('Espera retornar status 201 em caso de sucesso', async () => {
      const payload = { 
        username: 'novousuario',
        password: 'Minhasenha1'
      };
      const result = {
        id: 1,
        username: 'novousuario',
        accountId: 1,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJsZW5vbnJ1c3QiLCJhY2NvdW50SWQiOjEsImlhdCI6MTY2OTAzNTA3MCwiZXhwIjoxNjY5MTIxNDcwfQ.bvqdTXBPufJjfmmROAL63E9nPLyzGJN63o9DWNVRGZs'
       };

      const createdAcc = {
        id: 1,
        balance: 100.00
      };

      sinon.stub(UserService, 'register').resolves(result)
      const response = await chai.request(app).post('/user/register').send(payload)

      expect(response.status).to.equal(201)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('username')
      expect(response.body).to.have.property('accountId')
      expect(response.body).to.have.property('token')
      
    });
  });
  describe('login', () => {
    it('Espera retornar status 400 se algum campo estiver vazio', async () => {
      const payload = { 
        username: "",
        password: "Minhasenha1"
      };
      const response = await chai.request(app).post('/user/login').send(payload)

      expect(response.status).to.equal(400)
           
    });
    it('Espera retornar status 404 se usuário não encontrado', async () => {
      const payload = { 
        username: "novousuario",
        password: "Minhasenha1"
      };
      sinon.stub(User, 'findOne').resolves(undefined)
      const response = await chai.request(app).post('/user/login').send(payload)

      expect(response.status).to.equal(404)
      expect(response.body.message).to.be.equal("Usuario não encontrado.")  
           
    });
    it('Espera retornar status 404 se senha estiver incorreta', async () => {
      const payload = { 
        username: 'novousuario',
        password: 'Minhasenha1'
      };

      const result = { 
        username: 'novousuario',
        password: 'ZZZZZZZZZZZZ'
      };

      sinon.stub(User, 'findOne').resolves(result as any)
      const response = await chai.request(app).post('/user/login').send(payload)

      expect(response.status).to.equal(404)
      expect(response.body.message).to.be.equal("Senha invalida.") 
      
    });
    it('Espera retornar dados do usuáio corretamente', async () => {
      const payload = { 
        username: 'novousuario',
        password: 'Minhasenha1'
      };

      const result = {
        id: 1,
        username: 'novousuario',
        accountId: 1,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
       };

      sinon.stub(UserService, 'login').resolves(result)
      const response = await chai.request(app).post('/user/login').send(payload)

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('username')
      expect(response.body).to.have.property('accountId')
      expect(response.body).to.have.property('token')
      
    });
  });
  describe('validate', () => {
    it('Espera retornar status 401 se token não encontrado', async () => {
      const token = ''
      const response = await chai.request(app).get('/user/validate')
      .set({'Authorization': token})

      expect(response.status).to.equal(401)
      expect(response.body.message).to.be.equal('Token não encontrado.')
    });
    it('Espera retornar status 200 e dados de usuário', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJuYW1lIjoiTEVOT04gRFVBUlRFIFJVU1QiLCJlbWFpbCI6Imxlbm9uLnJ1c3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmNWJiMGM4ZGUxNDZjNjdiNDRiYWJiZjRlNjU4NGNjMCIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NjQ0ODQ5MzYsImV4cCI6MTY2NTA4OTczNn0.LznzJO7Z5vtN6pbuQkkkLOu6heUKqnNLG836J-zjeN4'
      sinon.stub(Token, 'readToken').resolves({})
      const response = await chai.request(app).get('/user/validate')
        .set({'Authorization': token})

      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal({})
    });
  });
  describe('userBalance', () => {
    it('Espera retornar status 401 caso token não seja enviado', async () => {
      const response = await chai.request(app).get('/user/balance')
        .set({'authorization': ''})

      expect(response.status).to.equal(401)
      expect(response.body.message).to.be.equal('Token não encontrado.')
    });

    it('Espera retornar status 200 com o balanço financeiro do usuário', async () => {
      const result = {
        id: 1,
        username: 'novousuario',
        accountId: 1,
       };
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJuYW1lIjoiTEVOT04gRFVBUlRFIFJVU1QiLCJlbWFpbCI6Imxlbm9uLnJ1c3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiJmNWJiMGM4ZGUxNDZjNjdiNDRiYWJiZjRlNjU4NGNjMCIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NjQ0ODQ5MzYsImV4cCI6MTY2NTA4OTczNn0.LznzJO7Z5vtN6pbuQkkkLOu6heUKqnNLG836J-zjeN4'
      sinon.stub(Token, 'readToken').returns(result)
      sinon.stub(AccountService, 'getBalance').resolves({balance: 100.00})
      const response = await chai.request(app).get('/user/balance')
        .set({'authorization': token})

      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('balance')
    });
  });
})