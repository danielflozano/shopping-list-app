import { createContext, useContext, useEffect, useState } from "react";
import { addProduct, getProducts, updateProduct, deleteProduct } from '../helpers'

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false);
      console.log('Entro al useEffect');
    };
    loadProducts();
  }, []);

  const handleSearchProducts = (searchTerm) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    
    if (normalizedSearchTerm === "") {
      if (filteredProducts.length !== products.length) {
        setFilteredProducts(products); // Evitar actualizar innecesariamente
      }
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchTerm)
      );
  
      if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
        setFilteredProducts(filtered);
      }
    }
  };
  

  const handleAddProduct = async (product) => {
    await addProduct(product);
    setProducts(await getProducts());
  }
  
  const handleUpdateProduct = async (id, newData) => {
    await updateProduct(id, newData);
    setProducts(await getProducts());
  }
  
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(await getProducts());
  }
  

  return (
    <ProductsContext.Provider value={{ products, filteredProducts, setFilteredProducts, loading, handleSearchProducts, handleAddProduct, handleUpdateProduct, handleDeleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
