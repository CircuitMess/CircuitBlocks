import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const AppProvider = ({ reducer, initialState, children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);

const useAppStateValue = () => useContext(AppContext);

export default AppContext;
export { AppContext, AppProvider, useAppStateValue };
