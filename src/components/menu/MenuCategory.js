'use client';
import SectionHeaders from '@/components/layout/SubHeader';
import MenuItem from '@/components/menu/MenuItem';
import { useEffect, useState } from 'react';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
    });
  }, []);
  return (
    <section className='mt-10'>
        <div className='text-center'>
        <SectionHeaders mainHeader={'Categorias'} />
        </div>
      {categories?.length > 0 &&
        categories.map((c) => (
            
            // if(){}
          <div key={c._id}>
            <div className='text-left'>
              <div className='text-black-500 font-bold text-2xl'>
                {c.name}
              </div>
            </div>
            <div className='grid sm:grid-cols-3 gap-4 mt-6 mb-12'>
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
