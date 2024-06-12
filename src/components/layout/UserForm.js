'use client';
import AddressInputs from '@/components/layout/EnderecoInput';
import EditableImage from '@/components/layout/ImagemEditar';
import { useProfile } from '@/components/UseProfile';
import { useState } from 'react';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [telefone, setTelefone] = useState(user?.telefone || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const [endereco, setEndereco] = useState(user?.endereco || '');
  const [cep, setCep] = useState(user?.cep || '');
  const [cidade, setCidade] = useState(user?.cidade || '');
  const [estado, setEstado] = useState(user?.estado || '');
  const [numerocep, setNumeroCep] = useState(user?.numerocep || '');

  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'telefone') setTelefone(value);
    if (propName === 'endereco') setEndereco(value);
    if (propName === 'cep') setCep(value);
    if (propName === 'cidade') setCidade(value);
    if (propName === 'estado') setEstado(value);
    if (propName === 'numerocep') setNumeroCep(value);
  }

  function handleSave(ev) {
    ev.preventDefault();
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
    });
  }

  function formatTelefone(value) {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]})${match[2]}${match[3]}`;
    }
    return value;
  }

  function handleTelefoneChange(ev) {
    const formattedValue = formatTelefone(ev.target.value);
    setTelefone(formattedValue);
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <form onSubmit={handleSave}>
        <div className='bg-white shadow sm:rounded-lg p-4'>
          <h2 className='text-lg font-medium leading-6 text-gray-900'>
            Perfil
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Nome
              </label>
              <input
                type='text'
                placeholder='Nome'
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Telefone
              </label>
              <input
                type='tel'
                placeholder='Telefone'
                value={telefone}
                onChange={handleTelefoneChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                disabled
                value={user?.email}
                placeholder='Email'
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              />
            </div>

            {loggedInUserData.admin && (
              <div className='mt-4 sm:col-span-2'>
                <label className='inline-flex items-center gap-2'>
                  <input
                    id='adminCb'
                    type='checkbox'
                    className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded'
                    checked={admin}
                    onChange={(ev) => setAdmin(ev.target.checked)}
                  />
                  <span className='text-sm font-medium text-gray-700'>
                    Admin
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className='bg-white shadow sm:rounded-lg p-4 mt-8'>
          <h2 className='text-lg font-medium leading-6 text-gray-900'>
            Endereço
          </h2>
          <AddressInputs
            addressProps={{
              telefone,
              endereco,
              cep,
              cidade,
              estado,
              numerocep,
            }}
            setAddressProp={handleAddressChange}
          />
        </div>

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
