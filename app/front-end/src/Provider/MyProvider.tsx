import React, { ReactNode, useMemo } from 'react';
import MyContext from './MyContext';


function MyProvider({ children }: { children: ReactNode }) {

  const contextObject = useMemo(() => ({
    }), []);

  return (
    <MyContext.Provider value={contextObject}>
      { children }
    </MyContext.Provider>
  )
}

export default MyProvider;