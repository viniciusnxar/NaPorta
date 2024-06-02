'use client';
import Right from '@/components/icons/Right';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch('/api/menu-items');
        if (!res.ok) throw new Error('Erro ao carregar itens do menu');
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Carregando informações do usuário...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!data.admin) {
    return <div className="text-center mt-8 text-red-500">Você não é admin.</div>;
  }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <UserTabs ChecarAdmin={true} />
      <div className='mt-8'>
        <Link className='button flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600' href={'/menu-items/new'}>
          <span>Crie um novo item no menu</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className='text-sm text-gray-500 mt-8'>Edite item no menu:</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={'/menu-items/edit/' + item._id}
                className='bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition'
              >
                <div className='relative'>
                  <Image
                    className='rounded-md'
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    layout='responsive'
                  />
                </div>
                <div className='text-center mt-2 font-semibold'>{item.name}</div>
              </Link>
            ))
          ) : (
            <div className="text-center col-span-3">Nenhum item encontrado.</div>
          )}
        </div>
      </div>
    </section>
  );
}
