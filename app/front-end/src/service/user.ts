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