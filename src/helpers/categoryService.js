import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../assets/firebase-config/firebase-config";


const CategoriesRef = collection(db, "categories");

export const addCategory = async (category) => {
  try {

    await addDoc(CategoriesRef, category);
    console.log('Categoria agregada con éxito');
  } catch (error) {

    console.error('Error al agregar la Categoria', error);
  }
};

export const getCategories = async() => {
  try {
    
    const querySnapshot = await (getDocs(CategoriesRef));
    const categories = await Promise.all(querySnapshot.docs.map(async(categoryDoc) => {

      const categoryData = categoryDoc.data();
      return {
        id: categoryDoc.id,
        ...categoryData,
      }
    }));

    return categories;
  } catch (error) {

    console.error('Error al obtener las categorias: ', error);
    return [];
  }
};

export const updateCategory = async (id, newData) => {
  try {
    
    const categoryData = doc(db, "categories", id);
    await updateDoc(categoryData, newData);
    console.log('Categoria actualizada');
  } catch (error) {

    console.error('Error al actualizar la categoria: ', error);    
  }
};

export const deleteCategory = async (id) => {
  try {
    
    const categoryData = doc(db, "categories", id);
    await deleteDoc(categoryData);
    console.log('Categoria eliminada');
    
  } catch (error) {
    
    console.error('Error al eliminar la categoria: ', error);
  }
};