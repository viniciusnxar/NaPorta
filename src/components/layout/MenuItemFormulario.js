import Plus from '@/components/icons/Plus';
import Trash from '@/components/icons/Trash';
import EditableImage from '@/components/layout/ImagemEditar';
import MenuItemPriceProps from '@/components/layout/MenuItemPrecoProp';
import { useEffect, useState } from 'react';

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className='mt-8 max-w-2xl mx-auto'
    >
      <div
        className='md:grid items-start gap-4'
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className='grow'>
          <label>Nome do item</label>
          <input
            type='text'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Descrição</label>
          <input
            type='text'
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Categoria</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Preço base</label>
          <input
            type='text'
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={'Tamanhos'}
            addLabel={'Add tamanho do item'}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={'Ingredientes extras'}
            addLabel={'Add preço dos ingredientes'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type='submit'>Salvas</button>
        </div>
      </div>
    </form>
  );
}
