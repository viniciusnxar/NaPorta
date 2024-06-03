'use client';
import { CartContext } from '@/components/AppContext';
import Bars2 from '@/components/icons/Bars2';
import ShoppingCart from '@/components/icons/ShoppingCart';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useState } from 'react';


function AuthLinks({ status, userName, ChecarAdmin }) {
  const ChecarAdmin = true
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  if (status === 'authenticated') {
    return (
      <>
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={toggleDropdown}
            className="whitespace-nowrap text-primary inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            Perfil
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Link
                  href='/profile'
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  Perfil
                </Link>
                {ChecarAdmin && (
                  <>
                    <Link
                      href='/categories'
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Categorias
                    </Link>
                    <Link
                      href='/menu-items'
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Menu
                    </Link>
                    <Link
                      href='/users'
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Usuários
                    </Link>
                  </>
                )}
                <Link
                  href='/orders'
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  Pedidos
                </Link>
              </div>
            </div>
          )}
        </div>
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
  // remover depois
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  const ChecarAdmin = userData?.isAdmin;

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
          <AuthLinks status={status} userName={userName} ChecarAdmin={ChecarAdmin} />
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
          <AuthLinks status={status} userName={userName} ChecarAdmin={ChecarAdmin} />
        </div>
      )}
    </header>
  );
}
