import { signWithGoogle } from '../helpers/authService';
import logo from '../assets/icons/logoGoogleLight.png';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../assets/firebase-config/firebase-config';


export const BtnGoogle = ({content}) => {

  const handleGoogleLogin = async() => {
    try {
      const user = await signWithGoogle()
      console.log('Usuario Autenticado', user);

      await setDoc(doc(db,"users", user.uid), {
        firstname: user.displayName,
        email: user.email,
        uid: user.uid
      });
      
    } catch (error) {
      console.error('Error en el Login con Google');
      throw error;
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex items-center space-x-7 w-full bg-white text-black border-solid border-2 border-gray-100 px-5 py-2 rounded-xl mt-6 font-semibold mb-6"
      aria-label="Registrarse con Google"
    >
      <img
        src={logo}
        alt="Google Logo"
        className="w-6 ml-6 mr-0" 
      />
      <span className='w-full'> {content} </span>
    </button>
  )
}