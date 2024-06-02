'use client';
import { CartContext } from '@/components/AppContext';
import Bars2 from '@/components/icons/Bars2';
import ShoppingCart from '@/components/icons/ShoppingCart';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useState } from 'react';

function AuthLinks({ status, userName }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className='whitespace-nowrap text-primary'>
          {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className='text-primary'
        >
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link
          href={'/register'}
          className='bg-primary rounded-full text-white px-8 py-2'
        >
          Registrar
        </Link>
      </>
    );
  }
}

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className='bg-[#F7F7F7]'>
      <div className='flex items-center justify-between p-4 md:p-11'>
        <Link className='text-primary font-semibold text-2xl' href={'/'}>
          NaPorta
        </Link>
        <div className='md:hidden flex items-center'>
          <Link href={'/cart'} className='relative'>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className='absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3'>
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className='p-2'
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Open Mobile Menu"
          >
            <Bars2 />
          </button>
        </div>
        <nav className='hidden md:flex items-center gap-8 text-gray-500 font-semibold'>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#categories'}>Categorias</Link>
          <Link href={'/#contact'}>Contato</Link>
        </nav>
        <div className='hidden md:flex items-center gap-4 text-gray-500 font-semibold'>
          <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className='relative'>
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className='absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3'>
                {cartProducts.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      {mobileNavOpen && (
        <div className='md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center'>
          <Link href={'/'} onClick={() => setMobileNavOpen(false)}>Home</Link>
          <Link href={'/menu'} onClick={() => setMobileNavOpen(false)}>Menu</Link>
          <Link href={'/#categories'} onClick={() => setMobileNavOpen(false)}>Categorias</Link>
          <Link href={'/#contact'} onClick={() => setMobileNavOpen(false)}>Contato</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
    </header>
  );
}
