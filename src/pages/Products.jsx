import { useEffect, useState } from "react";
import { productService } from "../helpers";



export const Products = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService().then((resp) => {

      console.log(resp);
      setProducts(resp);
    });
      
    }, []);
  

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
          {
            products.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>Categoria: {product.category}</p>
              </li>
            ))
          }
      </ul>
    </div>
  )
};