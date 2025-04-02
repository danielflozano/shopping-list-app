import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase-config/firebase-config";


const storesRef = collection(db, "stores");

export const addStore = async (store) => {
  try {

    await addDoc(storesRef, store);
    console.log('Tienda agregada con éxito');
  } catch (error) {

    console.error('Error al agregar la tienda', error);
  }
};

export const getStores = async() => {
  try {
    
    const querySnapshot = await (getDocs(storesRef));
    const stores = await Promise.all(querySnapshot.docs.map(async(storeDoc) => {

      const storeData = storeDoc.data();
      return {
        id: storeDoc.id,
        ...storeData,
      }
    }));

    return stores;
  } catch (error) {

    console.error('Error al obtener las tiendas: ', error);
    return [];
  }
};

export const updateStore = async (id, newData) => {
  try {
    
    const storeData = doc(db, "stores", id);
    await updateDoc(storeData, newData);
    console.log('tienda actualizada');
  } catch (error) {

    console.error('Error al actualizar la tienda: ', error);    
  }
};

export const deleteStore = async (id) => {
  try {
    
    const storeData = doc(db, "stores", id);
    await deleteDoc(storeData);
    console.log('tienda eliminada');
    
  } catch (error) {
    
    console.error('Error al eliminar la tienda: ', error);
  }
};