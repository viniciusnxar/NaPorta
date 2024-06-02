'use client';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import Trash from '@/components/icons/Trash';
import AddressInputs from '@/components/layout/EnderecoInput';
import SectionHeaders from '@/components/layout/SubHeader';
import CartProduct from '@/components/menu/CartProduct';
import { useProfile } from '@/components/UseProfile';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Pagamento falhou 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.cidade) {
      const { telefone, endereco, cidade, cep, estado } = profileData;
      const addressFromProfile = {
        telefone,
        endereco,
        cidade,
        cep,
        estado,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
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
        <p className='mt-4'>Seu carrinho esta vazio 😔</p>
      </section>
    );
  }

  return (
    <section className='mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader='Carrinho' />
      </div>
      <div className='mt-8 grid gap-8 grid-cols-2'>
        <div>
          {cartProducts?.length === 0 && <div>Sem produtos no carrinho!</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                onRemove={() => removeCartProduct(index)}
              />
            ))}
          <div className='py-2 pr-16 flex justify-end items-center'>
            <div className='text-gray-500'>
              Subtotal:
              <br />
              Frete:
              <br />
              Total:
            </div>
            <div className='font-semibold pl-2 text-right'>
              R${subtotal}
              <br />
              R$5
              <br />
              R${subtotal + 5}
            </div>
          </div>
        </div>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type='submit'>Pague R${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
