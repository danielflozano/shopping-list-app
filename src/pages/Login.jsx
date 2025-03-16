import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { BtnGoogle } from "../components/BtnGoogle";
import { BtnFacebook } from "../components/BtnFacebook";
import { useAuth } from "../contexts/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../assets/firebase-config/firebase-config";
import { BtnGithub } from "../components/BtnGitHub";

export const Login = () => {

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error('Error al iniciar sesión: ', error.message);
      alert('Correo o contraseña incorrectos.');
    }
  };

  if (user) return <Navigate to='/home' />;

  console.log(user);
  

  return (
    <div className="flex justify-center items-center h-screen bg-editColor-5">
      <div className="bg-editGreen p-6 rounded-xl shadow-2xl shadow-editColor-2 w-104 bg-white">
        <form
        onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="italic text-5xl font-bold text-center mb-10">Shopping List</h2>
          <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register('email', {required: 'El email es obligatorio'})}
              className="w-full p-2 border rounded"          
            />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {value:6, message: 'Mínimo 6 caracteres'},
              })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
          type="submit"
          className="w-full bg-editColor-3 text-white py-2 rounded-xl hover:bg-editColor-2"
          >
            Ingresar
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-2 text-gray-500">o</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <BtnGoogle content={'Inicia sesión con Google'} />
        <BtnFacebook content={'Inicia sesión con Facebook'} />
        <BtnGithub content={'Inicia sesión con GitHub'} />
        <div className="text-center">
          <p>¿No tienes una cuenta? <Link to={'/register'} className="text-blue-500 underline">Registrate</Link> </p> 
        </div>
      </div>
    </div>
  )
};

