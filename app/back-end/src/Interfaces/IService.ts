import { Selectors } from "./IModel";

export default interface IService<T> {
  add(obj: T): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(selector: T): Promise<T>;
  update(selector: T, obj: T): Promise<T>
  delete(selector: T): Promise<T>
}

