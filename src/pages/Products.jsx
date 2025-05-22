import { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { ProductForm } from "../components/ProductForm";
import { AddButton } from "../components/AddButton";

export const Products = () => {

  const { filteredProducts, handleAddProduct, handleUpdateProduct, handleDeleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);

  const handleOpenForm = (product = null) => {
    setUpdateProduct(product);
    setShowForm(true);    
  }

  const handleCloseForm = () => {
    setShowForm(false);
    setUpdateProduct(null);
  }

  const handleSaveProduct = (product) => {
    if(updateProduct) {
      handleUpdateProduct(updateProduct.id, product);
    } else {
      handleAddProduct(product);
    }
    handleCloseForm();
  }

  console.log("filteredProducts", filteredProducts);
  console.log('Se re-renderiza products');
  
  if (showForm) {
    return (
      <ProductForm 
      product={updateProduct}
      onSave={handleSaveProduct}
      onCancel={handleCloseForm}
    />
    )
  }

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold mb-5">Lista de Productos</h2> */}
      <div className="flex flex-col items-start">
          {
            filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleOpenForm(product)}
                className="bg-editColor-4 w-full text-start p-4 mb-1 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-editColor-1">{product.name}</h3>
                {/* <p>Categoria: {product.category}</p> */}
              </button>
            ))
          }
      </div>
      <AddButton onClick={() => handleOpenForm()} />
    </div>
  )
};