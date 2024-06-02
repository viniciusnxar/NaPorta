'use client';
import DeleteButton from '@/components/DeleteButton';
import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import { useProfile } from '@/components/UseProfile';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const categories = await res.json();
      setCategories(categories);
    } catch (error) {
      toast.error('Erro ao buscar categorias');
    }
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      try {
        const response = await fetch('/api/categories', {
          method: editedCategory ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        setCategoryName('');
        fetchCategories();
        setEditedCategory(null);
        if (response.ok) resolve();
        else reject();
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(creationPromise, {
      loading: editedCategory ? 'Atualizando categoria...' : 'Criando nova categoria...',
      success: editedCategory ? 'Categoria atualizada!' : 'Categoria criada!',
      error: 'Erro...',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/categories?_id=' + _id, {
          method: 'DELETE',
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(promise, {
      loading: 'Deletando...',
      success: 'Deletado',
      error: 'Erro',
    });

    fetchCategories();
  }

  if (profileLoading) {
    return <div className='text-center mt-8'>Carregando informações do usuário...</div>;
  }

  if (!profileData.admin) {
    return <div className='text-center mt-8 text-red-500'>Você não é um Admin do sistema!!!</div>;
  }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <UserTabs ChecarAdmin={true} />
      <form className='mt-8' onSubmit={handleCategorySubmit}>
        <div className='flex gap-2 items-end'>
          <div className='grow'>
            <label className='block text-sm font-medium text-gray-700'>
              {editedCategory ? 'Atualizar Categoria' : 'Novo nome da categoria'}
              {editedCategory && (
                <>
                  : <b className='text-primary'>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type='text'
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
            />
          </div>
          <div className='pb-2 flex gap-2'>
            <button
              className='border border-primary px-4 py-2 rounded-md bg-primary text-white'
              type='submit'
            >
              {editedCategory ? 'Atualizar' : 'Criar'}
            </button>
            <button
              type='button'
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
              className='border border-gray-300 px-4 py-2 rounded-md'
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className='mt-8 text-sm text-gray-500'>Categorias existentes</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center'
            >
              <div className='grow'>{c.name}</div>
              <div className='flex gap-1'>
                <button
                  type='button'
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                  className='text-blue-600 hover:underline'
                >
                  Editar
                </button>
                <DeleteButton
                  label='Deletar'
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
