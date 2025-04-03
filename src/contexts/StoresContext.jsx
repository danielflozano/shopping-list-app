import { createContext, useContext, useEffect, useState } from "react";
import { addStore, getStores, updateStore, deleteStore, getProducts } from '../helpers'

const storesContext = createContext();

export const StoresProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStores = async() => {
      const allStores = await getStores();
      setStores(allStores);
      setFilteredStores(allStores);
      setLoading(false);
    }
    loadStores();
  }, []);

  const handleSearchStores = (searchTerm) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
    if(normalizedSearchTerm === '') {
      if(filteredStores.length !== stores.length) {
        setFilteredStores(stores);
      }
    } else {
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(normalizedSearchTerm)
      );
  
      if(JSON.stringify(filtered) !== JSON.stringify(filteredStores)) setFilteredStores(filtered)
    }
  };
  
  const handleAddStore = async(store) => {
    await addStore(store);
    setStores(await getStores());
  }
  
  const handleUpdateStore = async(id, newData) => {
    await updateStore(id, newData);
    setStores(await getStores());
  }
  
  const handleDeleteStore = async(id) => {
    await deleteStore(id);
    setStores(await getProducts())
  }
  
  return (
    <storesContext.Provider
      value={{ stores, filteredStores, setFilteredStores, loading, handleSearchStores, handleAddStore, handleUpdateStore, handleDeleteStore }}
    >
      {children}
    </storesContext.Provider>
  );
};

export const useStores = () => useContext(storesContext);