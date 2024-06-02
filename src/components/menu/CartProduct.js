import { cartProductPrice } from '@/components/AppContext';
import Trash from '@/components/icons/Trash';
import Image from 'next/image';

export default function CartProduct({ product, onRemove }) {
  return (
    <div className='flex items-center gap-4 border-b py-4'>
      <div className='w-24'>
        <Image
          width={240}
          height={240}
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className='grow'>
        <h3 className='font-semibold'>{product.name}</h3>
        {product.size && (
          <div className='text-sm'>
            Tamanho: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className='text-sm text-gray-500'>
            {product.extras.map((extra) => (
              <div key={extra.name}>
                {extra.name} R${extra.price.toFixed(2)}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='text-lg font-semibold'>
        R${cartProductPrice(product).toFixed(2)}
      </div>
      {!!onRemove && (
        <div className='ml-2'>
          <button
            type='button'
            onClick={() => onRemove()}
            className='p-2 text-red-600 hover:text-red-800 focus:outline-none'
            aria-label='Remove'
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
