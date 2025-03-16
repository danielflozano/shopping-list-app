import { doc, setDoc } from 'firebase/firestore';
import logo from '../assets/icons/githubLogoNegro.png'
import { signWithGithub } from '../helpers/authService';
import { db } from '../assets/firebase-config/firebase-config';

export const BtnGithub = ({content}) => {

  const handleGithubLogin = async() => {
    try {
      const user = await signWithGithub();
      console.log('Usuario Autenticado', user);

      await setDoc(doc(db, "users", user.uid),{
        firstname: user.displayName,
        email: user.email,
        uid: user.uid
      })
      
    } catch (error) {
      console.error('Error en el Login con GitHub');
      throw error;
    }
  }


  return (
    <button
      type="button"
      onClick={handleGithubLogin}
      className="flex items-center space-x-7 w-full bg-white text-black border-solid border-2 border-gray-100 px-5 py-2 rounded-xl mt-6 font-semibold mb-6"
      aria-label="Registrarse con Github"
    >
      <img
        src={logo}
        alt="GitHub Logo"
        className="w-6 ml-6 mr-0" 
      />
      <span className='w-full'> {content} </span>
    </button>
  )
}