import { useState } from "react"


export const StoreForm = ({ store, onSave, onCancel }) => {
  const [name, setName] = useState(store?.name || '');

  const handleSubmit = (e) => {

    e.preventDefault();
    if(!name) alert('El nombre de la tienda es obligatorio');
    onSave({ name:name });
  }

  return (
    <div className="bg-white fixed inset-0 flex items-center justify-center">
      <div className="bg-editColor-1 text-editColor-5 text-xl p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl text-center font-semibold mb-6">{store ? 'Editar Tienda' : 'Agregar Tienda'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-semibold">Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={ (e) => setName(e.target.value) }
            className="bg-editColor-4 border-none outline-none text-editColor-1 font-semibold px-3 py-1 rounded-md"
          />
          <div className="flex justify-around">
            <button type="submit" className="bg-editColor-5 text-editColor-1 font-semibold px-4 py-1 rounded-xl w-2/5">Guardar</button>
            <button type="button" onClick={onCancel} className="bg-editColor-5 text-editColor-1 font-semibold px-4 py-1 rounded-xl w-2/5">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};