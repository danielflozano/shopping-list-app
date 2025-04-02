import { useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { FaPlus } from "react-icons/fa6";
import { ProductForm } from "../components/ProductForm";

export const Products = () => {

  const { filteredProducts, handleAddProduct, handleUpdateProduct, handleDeleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);

  const handleOpenForm = (product = null) => {
    setUpdateProduct(product);
    setShowForm(true);
    console.log(product);
    
  }

  const handleCloseForm = () => {
    setShowForm(false);
    setUpdateProduct(null);
  }

  const handleSaveProduct = (product) => {
    if(updateProduct) {
      handleUpdateProduct(updateProduct.id, product);
      console.log(product);      
      console.log(updateProduct.id);
      
    } else {
      handleAddProduct(product);
    }
    handleCloseForm();
  }
  
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
                className="bg-editColor-4 w-full text-start p-4 mb-3 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-editColor-1">{product.name}</h3>
                {/* <p>Categoria: {product.category}</p> */}
              </button>
            ))
          }
      </div>
      <button
        onClick={() => handleOpenForm()}
        className="flex justify-center items-center fixed bottom-5 right-5 bg-editColor-1 text-3xl text-editColor-5 rounded-full w-14 h-14"
      >
        <FaPlus />
      </button>
    </div>
  )
};