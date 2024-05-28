'use client';
import AddressInputs from '@/components/layout/EnderecoInput';
import EditableImage from '@/components/layout/ImagemEditar';
import { useProfile } from '@/components/UseProfile';
import { useState } from 'react';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className='md:flex gap-4'>
      <div>
      
      </div>
      <form
        className='grow'
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        <label>Primeiro e último nome</label>
        <input
          type='text'
          placeholder='Primeiro e último nome '
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type='email'
          disabled={true}
          value={user?.email}
          placeholder={'email'}
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        <div className='p-0 rounded-lg relative max-w-[120px]'>
          <label>Imagem: </label>
          <EditableImage link={image} setLink={setImage} />
        </div>
        {loggedInUserData.admin && (
          <div>
            <label
              className='p-2 inline-flex items-center gap-2 mb-2'
              htmlFor='adminCb'
            >
              <input
                id='adminCb'
                type='checkbox'
                className=''
                value={'1'}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type='submit'>Salvar</button>
      </form>
    </div>
  );
}
