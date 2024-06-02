'use client';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import AddressInputs from '@/components/layout/EnderecoInput';
import SectionHeaders from '@/components/layout/SubHeader';
import CartProduct from '@/components/menu/CartProduct';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== 'undefined' && window.location.href.includes('clear-cart=1')) {
      clearCart();
    }

    const fetchOrder = async () => {
      if (id) {
        setLoadingOrder(true);
        try {
          const response = await fetch('/api/orders?_id=' + id);
          const orderData = await response.json();
          setOrder(orderData);
        } catch (error) {
          console.error('Erro ao carregar o pedido:', error);
        } finally {
          setLoadingOrder(false);
        }
      }
    };

    fetchOrder();
  }, [id, clearCart]);

  const subtotal = order?.cartProducts?.reduce((total, product) => total + cartProductPrice(product), 0) || 0;
  const shippingCost = 10;
  const total = subtotal + shippingCost;

  return (
    <section className='max-w-2xl mx-auto mt-8'>
      <div className='text-left'>
        <SectionHeaders mainHeader='Seu pedido:' />
        <div className='mt-4 mb-8'>
          <p>Detalhes do seu pedido abaixo:</p>
        </div>
      </div>
      {loadingOrder ? (
        <div className='text-center text-gray-500'>Carregando pedido...</div>
      ) : (
        order && (
          <div className='grid md:grid-cols-2 md:gap-16'>
            <div>
              {order.cartProducts.map((product) => (
                <CartProduct key={product._id} product={product} />
              ))}
              <div className='text-right py-2 text-gray-500'>
                <div>
                  Subtotal: <span className='text-black font-bold'>R${subtotal.toFixed(2)}</span>
                </div>
                <div>
                  Frete: <span className='text-black font-bold'>R${shippingCost.toFixed(2)}</span>
                </div>
                <div>
                  Total: <span className='text-black font-bold'>R${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <p className='mb-4'>Endereço de entrega:</p>
              <div className='bg-gray-100 p-4 rounded-lg'>
                <AddressInputs disabled={true} addressProps={order} setAddressProp={() => {}} />
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
}
