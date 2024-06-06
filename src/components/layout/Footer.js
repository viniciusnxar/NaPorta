'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-[#F7F7F7] text-gray-500 w-full py-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-normal capitalize mb-4'>NaPorta</h3>
        <p className='max-w-lg mx-auto mb-4 text-base leading-7'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo iste
          corrupti doloribus odio sed!
        </p>
        {/* <ul className='flex justify-center space-x-6 mb-12'>
          <li>
            <a href='#' className='text-white hover:text-aqua'>
              <i className='fa fa-facebook text-xl'></i>
            </a>
          </li>
          <li>
            <a href='#' className='text-white hover:text-aqua'>
              <i className='fa fa-twitter text-xl'></i>
            </a>
          </li>
          <li>
            <a href='#' className='text-white hover:text-aqua'>
              <i className='fa fa-google-plus text-xl'></i>
            </a>
          </li>
          <li>
            <a href='#' className='text-white hover:text-aqua'>
              <i className='fa fa-youtube text-xl'></i>
            </a>
          </li>
          <li>
            <a href='#' className='text-white hover:text-aqua'>
              <i className='fa fa-linkedin-square text-xl'></i>
            </a>
          </li>
        </ul> */}
      </div>
      <div className='bg-[#efefef]  py-5 text-center'>
        <p className='text-sm capitalize'>
          Baidu LTDA &copy;2024 
        </p>
      </div>
    </footer>
  );
}
