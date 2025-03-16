import { useAuth } from "../contexts/AuthContext";

export const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Inicio</h2>
      {user ? (
        <div className="text-center">
          <p><strong>Nombre:</strong> {user.firstname} {user.lastname}</p>
          <p><strong>UserName:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No hay usuario autenticado</p>
      )}
    </div>
  )
};