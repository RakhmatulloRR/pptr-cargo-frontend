import React, { useReducer, createContext, useContext } from 'react';
import { reducer, initialState } from './reducer';

export const ServersContext = createContext();

export const useServersContext = () => useContext(ServersContext);

export const ServersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ServersContext.Provider value={[state, dispatch]}>
      {children}
    </ServersContext.Provider>
  );
};
