import { z } from 'zod'

export const userSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3),
  password: z.string().min(8)
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number"),
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