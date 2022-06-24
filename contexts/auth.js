import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from '@lib/firebase';

const AuthContext = createContext({ user: null, userLoading: true });

export const AuthProvider = ({ children }) => {

  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState();
  /*
  useEffect(() => {
    return onAuthStateChanged((res) => {
      setUser(res);
      setUserLoading(false);
    });
  }, []);*/

  useEffect(() =>{
       const unlisten = onAuthStateChanged(
          res => {
            res ? setUser(res) : setUser(null);
            setUserLoading(false);
          },
       );
       return () => {
           unlisten;
       }
    }, []);


  return (
    <AuthContext.Provider value={[user, userLoading]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

