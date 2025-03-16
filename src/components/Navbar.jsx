import { useEffect, useState } from "react"
import { FaArrowLeft, FaSearch } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu } from "./Menu";
import { useAuth } from "../contexts/AuthContext";

const routeTitles = {
  '/home': 'Inicio',
  '/list': 'Listas',
  '/stores': 'Tiendas',
  '/products': 'Productos',
  '/categories': 'Categorias',
  '/purchase-records': 'Historial de Compras',
  '/my-expenses': 'Mis Gastos',
  '/inventory': 'Inventario',
  '/register': 'Registro de Usuario',
  '/login': 'Inicio de Sesión',
};

const getTitle = (pathname) => routeTitles[pathname] || 'Aplicación';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [title, setTitle] = useState(getTitle(location.pathname));
  const [menuOpen, setMenuOpen] = useState(false);
  const title = getTitle(location.pathname);
  const { user, logout } = useAuth();

  // useEffect(() => {
  //   const newTitle = getTitle(location.pathname);
  //   setTitle(newTitle);
  //   document.title = newTitle;
  // }, [location.pathname]);

  return (
    <nav className="bg-editColor-1 text-editColor-5 p-4 flex items-center justify-between rounded-b-xl">
      <div className="flex items-center">
        {location.pathname === '/home' ? (
          <Menu menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="text-editColor-5 hover:text-editColor-6 text-2xl mr-4"
          >
            <FaArrowLeft />
          </button>
        )}
        <span>{title}</span>
        {/* <h3>{user.firstname} {user.lastname}</h3>
        {user ? (
          <h3>Bienvenido: {user.firstname} {user.lastname}</h3>
        ) : (
          <h3>...</h3>
        )} */}
      </div>
      {location.pathname === '/products' && (
        <button 
          className="text-editColor-5 text-2xl"
        >
          <FaSearch />
        </button>
      )}      
    </nav>
  )
}

