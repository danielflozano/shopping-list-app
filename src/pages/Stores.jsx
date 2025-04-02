import { useState } from "react";
import { useStores } from "../contexts/StoresContext";

export const Stores = () => {

  const { filteredStores } = useStores();

  return (
    <div>
      <div className="flex flex-col items-start">
      {
        filteredStores.map((store) => (
          <button
            key={store.id}
            className="bg-editColor-4 w-full text-start p-4 mb-3 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-editColor-1">{store.name}</h3>
          </button>
        ))
      }
      </div>
    </div>
  )
};
