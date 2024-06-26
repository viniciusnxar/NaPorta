import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { telefone, endereco, cep, cidade, estado, numerocep } = addressProps;

  useEffect(() => {
    if (cep && cep.length === 9) {
      // Considerando o formato XXXXX-XXX
      const fetchAddressFromCep = async (cep) => {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${cep.replace('-', '')}/json/`
          );
          if (response.data.erro) {
            throw new Error('CEP não encontrado');
          }
          const { logradouro, localidade, uf } = response.data;
          setAddressProp('endereco', logradouro);
          setAddressProp('cidade', localidade);
          setAddressProp('estado', uf);
        } catch (error) {
          toast.error(
            'CEP não encontrado. Por favor, verifique e tente novamente.'
          );
          setAddressProp('endereco', '');
          setAddressProp('cidade', '');
          setAddressProp('estado', '');
        }
      };

      fetchAddressFromCep(cep);
    }
  }, [cep]);

  const formatCep = (value) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/^(\d{5})(\d)/, '$1-$2') // Coloca um hífen entre o quinto e o sexto dígito
      .substring(0, 9); // Limita o tamanho ao formato XXXXX-XXX
  };

  return (
    <div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CEP</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="CEP"
          value={cep || ''}
          onChange={(ev) => setAddressProp('cep', formatCep(ev.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Estado"
            value={estado || ''}
            onChange={(ev) => setAddressProp('estado', ev.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Cidade"
            value={cidade || ''}
            onChange={(ev) => setAddressProp('cidade', ev.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Endereço</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Endereço"
          value={endereco || ''}
          onChange={(ev) => setAddressProp('endereco', ev.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Número e Complemento</label>
        <input
          disabled={disabled}
          type="text"
          placeholder="Número e Complemento"
          value={numerocep || ''}
          onChange={(ev) => setAddressProp('numerocep', ev.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>
    </div>
  );
}
