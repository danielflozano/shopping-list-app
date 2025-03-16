import {  FaBars, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../contexts/AuthContext"
import userPhoto from '../assets/icons/user.png'


export const Menu = ({ menuOpen, toggleMenu }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <button
      onClick={toggleMenu}
      className="text-editColor-5 hover:text-editColor-6 text-2xl mr-4">
        <FaBars />
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-3/4 bg-editColor-6 rounded-xl">
          <div className="flex justify-between text-editColor-6 pb-3 bg-editColor-2 rounded-t-xl p-2">
            <div>
              <img 
                src={userPhoto}
                alt="UserPhoto"
                className="w-10"
              />
              <h3>{user.firstname} {user.lastname}</h3>
            </div>
            <button 
              onClick={logout}
              className="flex items-center text-editColor-6 hover:text-editColorFount-1 cursor-pointer"
            >
              <FaSignOutAlt className="mr-1" />
              <span>Cerrar sesión</span>
            </button>
          </div>
          <ul className="text-editColor-1 p-2">
            <li>Opcion1</li>
            <li>Opcion2</li>
            <li>Opcion3</li>
            <li>Opcion4</li>
            <li>Opcion5</li>
          </ul>
        </div>
      )}
    </>
  )
}
