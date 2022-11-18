import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3, "Username deve ter mais de 3 characteres."),
  password: z.string().min(8, "Senha deve ter mais de 8 characteres.")
    .regex(new RegExp(".*[A-Z].*"), "Senha deve conter uma letra maiuscula.")
    .regex(new RegExp(".*[a-z].*"), "Senha deve conter uma letra minuscula.")
    .regex(new RegExp(".*\\d.*"), "Senha deve conter um numero."),
  accountId: z.number().optional(),
})

export interface IUser {
  id?: number;
  username: string;
  password?: string;
  accountId?: number;
}

export interface IAccount {
  id?: number;
  balance: number;
}


export interface IUserBody {
  username: string;
  password: string;
}