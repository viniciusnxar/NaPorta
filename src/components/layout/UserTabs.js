'use client';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UserTabs({isAdmin}) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={path === '/profile' ? 'active' : ''}
        href={'/profile'}
      >
        Perfil
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
            Categorias
          </Link>
          <Link
            href={'/menu-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
            Itens do menu
          </Link>
          <Link
            className={path.includes('/users') ? 'active' : ''}
            href={'/users'}
          >
            Usuários 
          </Link>
        </>
      )}
      <Link
        className={path === '/orders' ? 'active' : ''}
        href={'/orders'}
      >
        Pedidos
      </Link>
    </div>
  );
}