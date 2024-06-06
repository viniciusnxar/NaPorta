// import FlyingButton from 'react-flying-item';

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  return (
    <div className='flying-button-parent mt-4'>
      {/* <FlyingButton targetTop={'1%'} targetLeft={'95%'} src={image}> */}
      <button
        type='button'
        onClick={onClick}
        className='bg-red-600 text-white rounded-md px-4 py-1 text-sm hover:bg-red-700 transition-all duration-200 ease-in-out'
      >
        {hasSizesOrExtras ? (
          <span>Adicionar ao carrinho R${basePrice.toFixed(2)}</span>
        ) : (
          <span>Adicionar ao carrinho</span>
        )}
      </button>
      {/* </FlyingButton> */}
    </div>
  );
}
