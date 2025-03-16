import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { auth, db } from "../assets/firebase-config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export const Register = () => {

  const { user } = useAuth();

  const {
      register,
      handleSubmit,
      formState: {errors}
    } = useForm();
  
    const onSubmit = async (data) => {
      try {

        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          email: data.email,
          uid: user.uid
        });

        console.log('Usuario registrado y datos guardados en Firestore');
        alert('Registro exitoso');        
      } catch (error) {

        console.error('Error en el registro: ', error.message);
        alert('error en el registro: ' + error.message);
        
      }
      
    };

    if(user) return <Navigate to='/home' />;
  
    return (
      <div className="flex justify-center items-center h-screen  bg-editColor-5">
        <div className="bg-editGreen p-6 rounded-xl shadow-2xl shadow-editColor-2 w-104 bg-white">
          <form
          onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="italic text-5xl font-bold text-center mb-10">Shopping List</h2>
            <h2 className="text-lg font-bold text-center mb-4">Registrate para empezar a crear tus listas de compras</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nombre</label>
              <input
                type="text"
                {...register('firstname', {required: 'El nombre es obligatorio'})}
                className="w-full p-2 border rounded"
              />
                {errors.firstname && (
                  <p className="text-red-500 text-sm">{errors.firstname.message}</p>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Apellido</label>
              <input
                type="text"
                {...register('lastname', {required: 'El apellido es obligatorio'})}
                className="w-full p-2 border rounded"
              />
                {errors.lastname && (
                  <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">UserName</label>
              <input
                type="text"
                {...register('username', {required: 'El username es obligatorio'})}
                className="w-full p-2 border rounded"
              />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
            </div>
            
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
              Registrarse
            </button>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <span className="px-2 text-gray-500">o</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="text-center">
            <p>¿Tienes una cuenta? <Link to={'/login'} className="text-blue-500 underline">Inicia sesión</Link> </p>
          </div>
        </div>
      </div>
    )
};
