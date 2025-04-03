import { useState } from "react";
import { useStores } from "../contexts/StoresContext";
import { StoreForm } from "../components/StoreForm";
import { AddButton } from "../components/AddButton";

export const Stores = () => {

  const { filteredStores, handleAddStore, handleUpdateStore, handleDeleteStore } = useStores();
  const [showForm, setShowForm] = useState(false);
  const [updateStore, setUpdateStore] = useState(null)

  const handleOpenForm = (store = null) => {
    setUpdateStore(store);
    setShowForm(true);

  }

  const handleCloseForm = () => {
    setShowForm(false);
    setUpdateStore(null);
  }

  const handleSaveStore = (store) => {
    if(updateStore) {
      handleUpdateStore(updateStore.id, store)      
    } else {
      handleAddStore(store)
    }
    handleCloseForm();
  }

  if(showForm) {
    return (
      <StoreForm
        store={updateStore}
        onSave={handleSaveStore}
        onCancel={handleCloseForm}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-col items-start">
      {
        filteredStores.map((store) => (
          <button
            key={store.id}
            onClick={ () => handleOpenForm(store) }
            className="bg-editColor-4 w-full text-start p-4 mb-3 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-editColor-1">{store.name}</h3>
          </button>
        ))
      }
      </div>
      <AddButton onClick={() => handleOpenForm()}/>
    </div>
  )
};
