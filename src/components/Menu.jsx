import {  FaBars, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../contexts/AuthContext"
import userPhoto from '../assets/icons/user.png'
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"

export const Menu = ({ menuOpen, toggleMenu }) => {
  const { user, logout } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleMenu(false); // Cierra el menú si se hace clic fuera
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, toggleMenu]);

  return (
    <>
      <button
      onClick={toggleMenu}
      className="text-editColor-5 hover:text-editColor-6 text-3xl mr-2">
        <FaBars />
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/80" onClick={() => toggleMenu(false)}></div>
          <div className="absolute top-20 left-4 w-3/4 bg-editColor-6 rounded-xl z-20">
            <div className="flex justify-between items-center text-editColor-6 p-3 bg-editColor-2 rounded-t-xl">
              <div className="flex flex-col items-center space-y-2">
                <img 
                  src={userPhoto}
                  alt="UserPhoto"
                  className="w-10"
                />
                <h3 className="text-xl">{user.firstname} {user.lastname}</h3>
              </div>
              <button 
                onClick={logout}
                className="flex items-center justify-center text-xl text-editColor-6 hover:text-editColorFount-1 cursor-pointer"
              >
                <FaSignOutAlt className="mr-1.5" />
                <span>Cerrar sesión</span>
              </button>
            </div>
            <ul className="text-editColor-1 text-xl p-2 space-y-2">
              <li><Link to="/products">Productos</Link></li>
              <li><Link to="/categories">Categorías</Link></li>
              <li><Link to="/stores">Tiendas</Link></li>
              <li><Link to="/my-expenses">Mis Gastos</Link></li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}