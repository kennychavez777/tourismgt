import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext.jsx';

export function useSession () {
  const { session, setSession } = useContext(SessionContext);

  const saveUser = (user) => {
    setSession(user)
  }

  const logout = () => {
    setSession({
      displayName: '',
      email: '',
      accessToken: '',
    });
  }

  return { session, setSession, saveUser, logout };
}