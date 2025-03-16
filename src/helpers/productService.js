import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
import { db } from "../assets/firebase-config/firebase-config";

export const productService = async () => {
  try {

    const querySnapshot = await getDocs(collection(db, 'products'));

    const products = await Promise.all(
      querySnapshot.docs.map(async (productDoc) => {
        const productData = productDoc.data();

        let categoryName = 'Sin categoria';
        if (productData.categories && productData.categories.id === "string") {
          const categoryRef = doc(db, "categories", productData.categories.id);
          const categoryDoc = await getDoc(categoryRef);
          if (categoryDoc.exists()) {
            categoryName = categoryDoc.data().nombre;
          }
        }

        return {
          id: productDoc.id,
          name: productData.name,
          category: categoryName,
        }
      })
    )

    return products
    
  } catch (error) {

    console.error('Error obteniendo productos', error);
    return [];    
  }
};