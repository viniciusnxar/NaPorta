'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserTabs({ ChecarAdmin }) {
  const path = usePathname();
  const isActive = (currentPath) => path === currentPath;

  return (
    <div className='flex max-w-4xl mx-auto gap-4 justify-center flex-wrap my-4'>
      <Link
        href='/profile'
        className={`tab ${isActive('/profile') ? 'active' : ''}`}
      >
        Perfil
      </Link>
      {ChecarAdmin && (
        <>
          <Link
            href='/categories'
            className={`tab ${isActive('/categories') ? 'active' : ''}`}
          >
            Categorias
          </Link>
          <Link
            href='/menu-items'
            className={`tab ${path.includes('menu-items') ? 'active' : ''}`}
          >
            Menu
          </Link>
          <Link
            href='/users'
            className={`tab ${isActive('/users') ? 'active' : ''}`}
          >
            Usuários
          </Link>
        </>
      )}
      <Link
        href='/orders'
        className={`tab ${isActive('/orders') ? 'active' : ''}`}
      >
        Pedidos
      </Link>
    </div>
  );
}
