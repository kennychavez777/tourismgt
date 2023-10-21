import { createContext } from "react";

const initialState = {
  email: '',
  token: '',
  refreshToken: ''
}

const SessionContext = createContext();

export function SessionProvider ({ children }) {
  return (
    <SessionContext.Provider value={initialState}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContext;