import { useState } from "react";
import { useCategories } from "../contexts/CategoriesContext";
import { AddButton } from "../components/AddButton";
import { CategoryForm } from "../components/CategoryForm";


export const Categories = () => {

  const { filteredCategories, handleAddCategory, handleUpdateCategory, handleDeleteCategory } = useCategories();
  const [showForm, setShowForm] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);

  const handleOpenForm = (category = null) => {

    setUpdateCategory(category);
    setShowForm(true);
  }

  const handleCloseForm = () => {

    setShowForm(false);
    setUpdateCategory(null);
  }

  const handleSaveCategory = (category) => {

    if(updateCategory) {
      handleUpdateCategory(updateCategory.id, category);
    } else {
      handleAddCategory(category);
    }
    handleCloseForm();
  }

  console.log("filteredCategories",filteredCategories);
  

  if(showForm) {
    return (
      <CategoryForm
        category={updateCategory}
        onSave={handleSaveCategory}
        onCancel={handleCloseForm}
      />
    )
  }

  return (
    <>
      <div className="flex flex-col items-start">
        {
          filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={ () => handleOpenForm(category) }
              className="bg-editColor-4 w-full text-start p-4 mb-1 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-editColor-1">{category.name}</h3>
            </button>
            ))
        }
      </div>
      <AddButton onClick={ () => handleOpenForm() } />
    </>
  )
};