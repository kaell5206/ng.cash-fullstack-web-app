import { NavigateFunction } from "react-router-dom";
import { ITransaction } from "../Interfaces/ITransaction";
import { IUser } from "../Interfaces/IUser";

const SUCCESSFULL_REQ_STATUS = 200;
const SUCCESSFULL_REQ_STATUS_REGISTER = 201;

export const fetchUser = async (username: string, password: string): Promise<IUser | any> => {
    const url = 'http://localhost:3001/user/login'
    const request = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await request.json();
    if (request.status !== SUCCESSFULL_REQ_STATUS) {
      return result.message;
    }
    return result;
}

export const fetchRegisterUser = async (username: string, password: string): Promise<IUser | any> => {
  const url = 'http://localhost:3001/user/register'
  const request = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const result = await request.json();
  if (request.status !== SUCCESSFULL_REQ_STATUS_REGISTER) {
    return result.message;
  }
  return result;
}

export const fetchUserValidation = async (navigate: NavigateFunction): Promise<IUser | void> => {
    const url = 'http://localhost:3001/user/validate';
    let getUser = localStorage.getItem('NGUser');
    if (!getUser) getUser = '';
    const parsedUser = JSON.parse(getUser);
    const get = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: parsedUser.token,
      } });
    const data = await get.json();
    if (!data.username) {
      localStorage.removeItem('NGUser');
      navigate('/')
    }
}

export const fetchUserBalance = async (): Promise<any> => {
  const url = 'http://localhost:3001/user/balance';
    let getUser = localStorage.getItem('NGUser');
    if (!getUser) getUser = '';
    const parsedUser = JSON.parse(getUser);
    const get = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: parsedUser.token,
      } });
    const data = await get.json();
    if (!data.balance) {
      return data.message;
    }
    return data
}

export const fetchCreateTransaction = async (creditedUser: string, value: string): Promise<any> => {
  const url = 'http://localhost:3001/actions/transaction';
    let getUser = localStorage.getItem('NGUser');
    if (!getUser) getUser = '';
    const parsedUser = JSON.parse(getUser);
    const get = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: parsedUser.token,
      },
      body: JSON.stringify({ creditedUser, value }),
    });
    const data = await get.json();
    if (!data.debitedAccountId) {
      return data.message;
    }
    return data
}

export const fetchTransactionHistory = async (): Promise<ITransaction[] | any> => {
  const url = 'http://localhost:3001/actions/transaction';
    let getUser = localStorage.getItem('NGUser');
    if (!getUser) getUser = '';
    const parsedUser = JSON.parse(getUser);
    const get = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: parsedUser.token,
      },
    });
    const data = await get.json();
    return data
}

