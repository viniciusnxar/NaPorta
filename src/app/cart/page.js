'use client';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import Trash from '@/components/icons/Trash';
import AddressInputs from '@/components/layout/EnderecoInput';
import SectionHeaders from '@/components/layout/SubHeader';
import CartProduct from '@/components/menu/CartProduct';
import { useProfile } from '@/components/UseProfile';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.href.includes('canceled=1')
    ) {
      toast.error('Pagamento falhou 😔');
    }
  }, []);

  useEffect(() => {
    if (profileData?.cidade) {
      const { telefone, endereco, cidade, cep, estado, numerocep } = profileData;
      setAddress({ telefone, endereco, cidade, cep, estado, numerocep });
    }
  }, [profileData]);

  const subtotal =
    cartProducts?.reduce(
      (total, product) => total + cartProductPrice(product),
      0
    ) || 0;
  const frete = 0.01;
  const total = subtotal + frete;

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, cartProducts }),
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            window.location = data.url;
            resolve();
          } else {
            reject();
          }
        })
        .catch(reject);
    });

    await toast.promise(promise, {
      loading: 'Preparando seu pedido...',
      success: 'Levando para a tela de pagamento...',
      error: 'Algo deu errado... tente mais tarde',
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className='mt-8 text-center'>
        <SectionHeaders mainHeader='Carrinho' />
        <p className='mt-4'>Seu carrinho está vazio 😔</p>
      </section>
    );
  }

  return (
    <section className='mt-8 max-w-5xl mx-auto'>
      <div className='text-center'>
        <SectionHeaders mainHeader='Carrinho' />
      </div>
      <div className='mt-8 grid gap-8 grid-cols-1 md:grid-cols-2'>
        <div>
          {cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              onRemove={() => removeCartProduct(index)}
            />
          ))}
          <div className='py-2 flex justify-end items-center'>
            <div className='text-gray-500'>
              <div>Subtotal:</div>
              <div>Frete:</div>
              <div>Total:</div>
            </div>
            <div className='font-semibold pl-2 text-right'>
              <div>R${subtotal.toFixed(2)}</div>
              <div>R${frete.toFixed(2)}</div>
              <div>R${total.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button
              type='submit'
              className='mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            >
              Pague R${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
