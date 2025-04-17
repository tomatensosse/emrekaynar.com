'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

interface HeaderProps {
  username: string | null;
  isLoggedIn: boolean;
}

export default function Header({ username, isLoggedIn }: HeaderProps) {
  const { language, theme, toggleLanguage, toggleTheme } = useApp();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <header className="border-b border-gray-300 p-4 flex justify-between">
      <h1>emre kaynar</h1>
      
      <div className="flex gap-4">
        <div>
          <button onClick={toggleLanguage}>
            {language === 'en' ? 'TR' : 'EN'}
          </button>
        </div>
        
        <div>
          <button onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div>
          {isLoggedIn ? (
            <div>
              <span>Logged in as {username}</span>
              <button onClick={handleLogout} className="ml-2">Logout</button>
            </div>
          ) : (
            <span>Guest</span>
          )}
        </div>
      </div>
    </header>
  );
}