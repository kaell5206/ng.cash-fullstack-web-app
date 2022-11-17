export interface IModel<T> {
  create(_obj: T, options?: Options): Promise<T>;
  findAll(selector?: Selectors, options?: Selectors): Promise<Array<T>>;
  findOne(selector: Selectors, options?: Options): Promise<T | null>;
  update(selector: Selectors, obj: T): Promise<T>;
  destroy(selector: Selectors): Promise<T>;
}

export interface Selectors {
  where?: SelectorType;
}

export interface SelectorType {
  _id?: number;
  _string?: string;
}

export interface Options {
  raw?: boolean;
}

