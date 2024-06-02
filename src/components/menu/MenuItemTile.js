import AddToCartButton from "@/components/menu/AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, discountedPrice, logo } = item;

  return (
    <div className="bg-white p-4 rounded-lg text-center shadow-md transition-all duration-300 ease-in-out max-w-xs mx-auto border">
      {logo && (
        <div className="flex justify-center mb-2">
          <img src={logo} className="h-6 w-6 object-cover rounded-full" alt="logo" />
        </div>
      )}
      <div className="mb-2">
        <img src={image} className="h-32 w-32 object-cover mx-auto rounded-md" alt={name} />
      </div>
      <h4 className="font-semibold text-left my-1 text-gray-800">{name}</h4>
      <p className="text-gray-600 text-left line-clamp-3 mb-2">{description}</p>
      <div className="text-green-600 text-left font-bold">{`R$ ${basePrice.toFixed(2)}`}</div>
      <div className="flex justify-center">
        <AddToCartButton
          image={image}
          onClick={onAddToCart}
          basePrice={basePrice}
        />
      </div>
    </div>
  );
}
