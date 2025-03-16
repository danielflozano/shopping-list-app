import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider, githubProvider } from "../assets/firebase-config/firebase-config";


export const signWithGoogle = async() => {
  try {
    const result = await signInWithPopup(auth, googleProvider);    
    return result.user;

  } catch (error) {
    console.error('Error al iniciar sesión con Google', error);
    throw error;
  }
};

export const signWithFacebook = async() => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;

  } catch (error) {
    console.error('Error al iniciar sesión con Facebook', error);
    throw error;
  }
};

export const signWithGithub = async() => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;

  } catch (error) {
    console.error('Error al iniciar sesión con Facebook', error);
    throw error;
  }
};