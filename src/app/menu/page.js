'use client';
import SectionHeaders from '@/components/layout/SubHeader';
import MenuItem from '@/components/menu/MenuItem';
import { useEffect, useState } from 'react';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, menuItemsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/menu-items'),
        ]);

        if (!categoriesRes.ok || !menuItemsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const categoriesData = await categoriesRes.json();
        const menuItemsData = await menuItemsRes.json();

        setCategories(categoriesData);
        setMenuItems(menuItemsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className='text-center mt-8'>Carregando...</div>;
  }

  if (error) {
    return <div className='text-center mt-8 text-red-500'>Erro: {error}</div>;
  }

  return (
    <section className='mt-8 max-w-7xl mx-auto px-4'>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category._id} className='mb-12'>
            <div className='text-center'>
              <SectionHeaders mainHeader={category.name} />
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
              {menuItems
                .filter((item) => item.category === category._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className='text-center mt-8'>Nenhuma categoria encontrada.</div>
      )}
    </section>
  );
}
