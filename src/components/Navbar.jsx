import { useEffect, useState } from "react"
import { FaArrowLeft, FaSearch } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import { Menu } from "./Menu";
import { useProducts } from "../contexts/ProductsContext";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleSearchProducts, products, setFilteredProducts } = useProducts();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const title = getTitle(location.pathname);


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      handleSearchProducts(searchTerm);
    }
    console.log('Ingresa al useEffect del navBar');
    
  }, [searchTerm, products]);
  
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
        <span className="text-2xl">{title}</span>
      </div>
      {location.pathname === "/products" && (
        <div className="flex items-center justify-end">
          {showSearch ? (
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={() => {
                if(searchTerm.trim() === '') {
                  setShowSearch(false);
                }
              }}
              className="border-none outline-none text-editColor-5 bg-editColor-2 px-2 py-1 rounded w-9/10"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="text-editColor-5 text-2xl"
            >
              <FaSearch />
            </button>
          )}
        </div>
      )}   
    </nav>
  )
}

