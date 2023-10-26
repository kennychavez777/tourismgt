import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext.jsx';
import { FIRESTORE as db } from '../firebase/config.js';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

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

  const getFullUser = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    let user = {};

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      user = item.data();
      user.id = item.id;
    });

    return user;
  }

  const getUserById = async(userId) => {
    const docRef = doc(db, 'users', userId);
    const snapshot = await getDoc(docRef);
    let user = {};
    
    if (snapshot.exists()) {
      user = snapshot.data();
    }

    return user;
  }

  return { session, setSession, saveUser, logout, getFullUser, getUserById };
}