import { createContext, useContext, useEffect, useState } from "react";
import { addStore, getStores, updateStore, deleteStore } from '../helpers'

const StoresContext = createContext();

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
      console.log('Entro al useEffect');
      
    };
    loadStores();
  }, []);

  const handleSearchStores = (searchTerm) => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  
    if(normalizedSearchTerm === "") {
      if(filteredStores.length !== stores.length) {
        setFilteredStores(stores);
      }
    } else {
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(normalizedSearchTerm)
      );
  
      if(JSON.stringify(filtered) !== JSON.stringify(filteredStores)) {
        setFilteredStores(filtered)
      }        
    }
  };
  
  const handleAddStore = async(store) => {
    await addStore(store);
    const updatedStores = await getStores();
    setStores(updatedStores);
    setFilteredStores(updatedStores);
  }
  
  const handleUpdateStore = async(id, newData) => {
    await updateStore(id, newData);
    const updatedStores = await getStores();
    setStores(updatedStores);
    setFilteredStores(updatedStores);
  }
  
  const handleDeleteStore = async(id) => {
    await deleteStore(id);
    setStores(await getStores());
  }
  
  return (
    <StoresContext.Provider
      value={{ stores, filteredStores, setFilteredStores, loading, handleSearchStores, handleAddStore, handleUpdateStore, handleDeleteStore }}
    >
      { children }
    </StoresContext.Provider>
  );
};

export const useStores = () => useContext(StoresContext);