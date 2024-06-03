'use client';
import AddressInputs from '@/components/layout/EnderecoInput';
import EditableImage from '@/components/layout/ImagemEditar';
import { useProfile } from '@/components/UseProfile';
import { useState } from 'react';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [telefone, settelefone] = useState(user?.telefone || '');
  const [endereco, setendereco] = useState(user?.endereco || '');
  const [cep, setcep] = useState(user?.cep || '');
  const [cidade, setcidade] = useState(user?.cidade || '');
  const [estado, setestado] = useState(user?.estado || '');
  const [numerocep, setnumerocep] = useState(user?.numerocep || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'telefone') settelefone(value);
    if (propName === 'endereco') setendereco(value);
    if (propName === 'cep') setcep(value);
    if (propName === 'cidade') setcidade(value);
    if (propName === 'estado') setestado(value);
    if (propName === 'numerocep') setnumerocep(value);

  }

  return (
    <div className='md:flex gap-4'>
      <div></div>
      <form
        className='grow'
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            telefone,
            admin,
            endereco,
            cidade,
            estado,
            cep,
            numerocep,
          })
        }
      >
        <div>
          <label className='block text-sm font-medium text-gray-700'>Primeiro e último nome</label>
          <input
            type='text'
            placeholder='Primeiro e último nome'
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
          />
        </div>
        
        <div>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            disabled={true}
            value={user?.email}
            placeholder='Email'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
          />
        </div>

        <AddressInputs
          addressProps={{ telefone, endereco, cep, cidade, estado, numerocep }}
          setAddressProp={handleAddressChange}
        />

        <div className='p-0 rounded-lg relative max-w-[120px]'>
          <label className='block text-sm font-medium text-gray-700'>Imagem</label>
          <EditableImage link={image} setLink={setImage} />
        </div>

        {loggedInUserData.admin && (
          <div className='mt-4'>
            <label className='inline-flex items-center gap-2'>
              <input
                id='adminCb'
                type='checkbox'
                className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span className='text-sm font-medium text-gray-700'>Admin</span>
            </label>
          </div>
        )}

        <button
          type='submit'
          className='mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
