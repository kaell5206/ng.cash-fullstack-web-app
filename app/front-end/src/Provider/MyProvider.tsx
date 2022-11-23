import React, { ReactNode, useMemo, useState } from 'react';
import MyContext from './MyContext';

function MyProvider({ children }: { children: ReactNode }) {

  const  [logedIn, setLogedIn] = useState(false);

  const contextObject = useMemo(() => ({
    logedIn, setLogedIn
    }), [logedIn]);

  return (
    <MyContext.Provider value={contextObject}>
      { children }
    </MyContext.Provider>
  )
}

export default MyProvider;