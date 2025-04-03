import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../assets/firebase-config/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) =>{
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ uid: firebaseUser.uid, ...userDoc.data() });
            
          } else {
            console.warn('El documento del usuario no existe en firestore.');
            setUser(null);
          }          
        } catch (error) {
          console.error('Error obteniendo datos del usuario', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return (unsubscribe);
  }, []);

  const logout = async() => {
    try {
      await signOut(auth);
      setUser(null);      
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);