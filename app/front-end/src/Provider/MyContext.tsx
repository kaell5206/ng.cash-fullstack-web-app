import { createContext } from 'react';
import { IContext } from '../Interfaces/IContext';

const MyContext = createContext<IContext>({} as IContext);

export default MyContext;