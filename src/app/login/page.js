'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8 max-w-md mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="email" 
            value={email}
            disabled={loginInProgress}
            onChange={ev => setEmail(ev.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input 
            type="password" 
            name="password" 
            placeholder="senha" 
            value={password}
            disabled={loginInProgress}
            onChange={ev => setPassword(ev.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <button 
          type="submit"
          disabled={loginInProgress}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loginInProgress ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : 'Login'}
        </button>
        <div className="my-4 text-center text-gray-500">
          Tente de outra forma:
        </div>
        <button 
          type="button" 
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex gap-4 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Image src={'/google.png'} alt={'Google logo'} width={24} height={24} />
          Login com Google
        </button>
      </form>
    </section>
  );
}
