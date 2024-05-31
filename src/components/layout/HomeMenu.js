'use client';
import SectionHeaders from '@/components/layout/SubHeader';
import MenuItem from '@/components/menu/MenuItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

//.slice define a quantidade de itens irão aparecer 
export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice());
      });
    });
  }, []);
  return (
    <section className=''>
      <div className='text-center mb-4'>
        <SectionHeaders
          // subHeader={'Venha ver'}
          mainHeader={'Menu'}
        />
      </div>
      <div className='grid sm:grid-cols-3 gap-4'>
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
