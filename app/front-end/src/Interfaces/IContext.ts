export interface IContext {
  logedIn: boolean;
  setLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
}