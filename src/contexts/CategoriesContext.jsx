import { createContext, useContext, useEffect, useState } from "react";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../helpers";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadCategories = async() => {
      const allCategories = await getCategories();
      setCategories(allCategories);
      setFilteredCategories(allCategories);
      setLoading(false);
      console.log('Entro al useEffect');
      
    }

    loadCategories();
  }, []); // No puedo meter categories aqui.

  // Funcion mejorada.
  const handleSearchCategories = (searchTerm) => {

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    if(!normalizedSearchTerm) {
      if(filteredCategories.length !== categories.length) {
        setFilteredCategories(categories);
      }
      return;
    }

    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(normalizedSearchTerm)
    );

    if(filtered.length !== filteredCategories.length) setFilteredCategories(filtered);    
  };

  const handleAddCategory = async(category) => {
    await addCategory(category);
    const newCategory = {id:Date.now(), name:category.name}
    setCategories((prev) => [...prev, newCategory]);
    setFilteredCategories((prev) => [...prev, newCategory]);
    console.log(newCategory);
    
  };

  const handleUpdateCategory = async(id, newData) => {
    await updateCategory(id, newData);
    setCategories((prev) => prev.map((category) => category.id === id ? { ...category, ...newData } : category));
    setFilteredCategories((prev) => prev.map((category) => category.id === id ? { ...category, ...newData } : category));
    
  };

  const handleDeleteCategory = async(id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((category) => category.id !== id));
    setFilteredCategories((prev) => prev.filter((category) => category.id !== id))
  };

  return (
    <CategoriesContext.Provider
      value={{ categories, filteredCategories, setFilteredCategories, loading, handleSearchCategories, handleAddCategory, handleUpdateCategory, handleDeleteCategory }}
    >
      { children }
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
