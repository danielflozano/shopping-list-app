import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase-config/firebase-config";


const productsRef = collection(db, "products");

export const addProduct = async (product) => {
  try {

    await addDoc(productsRef, product);
    console.log('Producto agregado con éxito');    
  } catch (error) {

    console.error('Error al agregar el producto', error);    
  }
};

export const getProducts = async() => {
  try {
    
    const querySnapshot = await (getDocs(productsRef));
    const products = await Promise.all(querySnapshot.docs.map(async(productDoc) => {

      const productData = productDoc.data();
      let categoryData = null;
      if(productData.categories) {
        const categoryDoc = await getDoc(productData.categories);
        if (categoryDoc.exists()) {
          categoryData = categoryDoc.data()
        }
      }
      return {
        id: productDoc.id,
        ...productData,
        category: categoryData ? categoryData.name: 'Categoria desconocida',
      }
    }));

    return products;
  } catch (error) {

    console.error('Error al obtener productos: ', error);
    return [];  
  }
};

// export const getProductByName = async (productName) => {
//   try {

//     const q = query(productsRef, where("name", "==", productName));
//     const querySnapshot = await getDocs(q);

//     if(querySnapshot.empty) {
//       console.log('No se encontró ningun producto con ese nombre');
//       return null;      
//     }

//     const product = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
//     console.log('Producto encontrado: ', product);
//     return product;    
//   } catch (error) {

//     console.error('Error al encontrar el producto, ', error);
//     return null    
//   }
// };

export const updateProduct = async (id, newData) => {
  try {
    
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, newData);
    console.log('Producto actualizado');
  } catch (error) {

    console.error('Error al actualizar el producto: ', error);    
  }
};

export const deleteProduct = async (id) => {
  try {
    
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    console.log('Producto eliminado');
    
  } catch (error) {
    
    console.error('Error al eliminar el producto: ', error);
  }
};