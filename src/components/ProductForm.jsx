import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useCategories } from '../contexts/CategoriesContext';
import { useStores } from '../contexts/StoresContext';

export const ProductForm = ({ product, onSave, onCancel }) => {

  const { user } = useAuth();
  const { categories } = useCategories();
  const { stores } = useStores();

  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [brand, setBrand] = useState(product?.brand || '');
  const [category, setCategory] = useState(product?.category);
  const [store, setStore] = useState(product?.store || '')
  const [unitM, setUnitM] = useState(product?.unitM || '');


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) return alert('El nombre del producto es obligatorio');
    onSave({ userId:user.uid, name, brand, price, category, store, unitM });
  }
  
  return (
    <div className="bg-white fixed inset-0 flex items-center justify-center">
      <div className="bg-editColor-1 text-editColor-5 text-xl p-6 rounded-2xl shadow-lg w-96">
        <h2 className='text-3xl text-center font-semibold mb-6'>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <label className='font-semibold'>Nombre</label>
          <input
            type="text"
            placeholder='Nombre'
            value={name}
            onChange={ (e) => setName(e.target.value) }
            className='bg-editColor-4 border-none outline-none text-editColor-1 font-semibold px-3 py-1 rounded-md'
          />
          <label className='font-semibold'>Precio</label>
          <input
            type="number"
            placeholder='Precio'
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className='bg-editColor-4 border-none outline-none text-editColor-1 font-semibold px-3 py-1 rounded-md'
          />
          <label className='font-semibold'>Marca</label>
          <input
            type="text"
            placeholder='Marca'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className='bg-editColor-4 border-none outline-none text-editColor-1 font-semibold px-3 py-1 rounded-md'
          />
          <label className='font-semibold'>Categoria</label>
          <select
          className='bg-editColor-4 border-none text-editColor-1/50 text- px-3 py-1 rounded-md outline-none'
            value={category}
            onChange={ (e) => setCategory(e.target.value) }
          >
            <option value="" hidden>Seleccione una Categoria</option>
            {
              categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
              ))
            }
          </select>
          <label className='font-semibold'>Tienda</label>
          <select
          className='bg-editColor-4 border-none text-editColor-1/50 text- px-3 py-1 rounded-md outline-none'
            value={store}
            onChange={ (e) => setStore(e.target.value) }
          >
            <option value="" hidden>Seleccione una Tienda</option>
            {
              stores.map((store) => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))
            }
          </select>
          <label className='font-semibold'>Unidad de Medida</label>
          <input
            type="text"
            placeholder='Unidad de medida'
            value={unitM}
            onChange={(e) => setUnitM(e.target.value)}
            className='bg-editColor-4 border-none outline-none text-editColor-1 font-semibold px-3 py-1 mb-7 rounded-md'
          />
          <div className='flex justify-around'>
            <button type='submit' className='bg-editColor-5 text-editColor-1 font-semibold px-4 py-1 rounded-xl w-2/5'>Guardar</button>
            <button type='button' onClick={onCancel} className='bg-editColor-5 text-editColor-1 font-semibold px-4 py-1 rounded-xl w-2/5'>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
