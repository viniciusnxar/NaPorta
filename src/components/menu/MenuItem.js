import { CartContext } from '@/components/AppContext';
import MenuItemTile from '@/components/menu/MenuItemTile';
import Image from 'next/image';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice = 0, sizes = [], extraIngredientPrices = [] } = menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopup(false);
    toast.success('Item adicionado ao carrinho!');
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => prev.filter((e) => e.name !== extraThing.name));
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    selectedExtras.forEach(extra => {
      selectedPrice += extra.price;
    });
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-6 rounded-lg max-w-md w-full"
          >
            <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
              <Image src={image} alt={name} width={300} height={200} className="mx-auto rounded-lg" />
              <h2 className="text-lg font-bold text-center my-4">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
              <div className="text-center text-red-600 text-lg font-semibold mb-4">
                R${selectedPrice.toFixed(2)}
              </div>
              {sizes.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700 mb-2">Escolha o tamanho</h3>
                  {sizes.map((size) => (
                    <label key={size._id} className="flex items-center gap-2 p-4 border rounded-md mb-2">
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                        className="form-radio"
                      />
                      {size.name} R${(basePrice + size.price).toFixed(2)}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700 mb-2">Algum extra?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    <label key={extraThing._id} className="flex items-center gap-2 p-4 border rounded-md mb-2">
                      <input
                        type="checkbox"
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras.map((e) => e._id).includes(extraThing._id)}
                        name={extraThing.name}
                        className="form-checkbox"
                      />
                      {extraThing.name} +R${extraThing.price.toFixed(2)}
                    </label>
                  ))}
                </div>
              )}
              <button
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-700 transition-all duration-200 ease-in-out"
                onClick={handleAddToCartButtonClick}
              >
                Adicionar ao carrinho R${selectedPrice.toFixed(2)}
              </button>
              <button
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md mt-2"
                onClick={() => setShowPopup(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
