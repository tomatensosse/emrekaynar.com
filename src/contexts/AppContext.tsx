'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'tr' | 'de';
type Theme = 'light' | 'dark';

interface AppContextType {
    language: Language;
    theme: Theme;
    setLanguage: (lang: Language) => void;
    setTheme: (theme: Theme) => void;
    toggleLanguage: () => void;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        const storedLanguage = localStorage.getItem('language') as Language | null;

        if (storedTheme) {
            setTheme(storedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }

        if (storedLanguage) {
            setLanguage(storedLanguage);
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (browserLang === 'tr' || browserLang === 'de') {
                setLanguage(browserLang as Language);
            }
        }
    }, []);

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => {
            if (prev === 'en') return 'tr';
            if (prev === 'tr') return 'de';
            return 'en';
        });
    };

    const toggleTheme = () => {
        setTheme(prev => prev == 'light' ? 'dark' : 'light');
    };

    return (
        <AppContext.Provider
            value={{
                language,
                theme,
                setLanguage,
                setTheme,
                toggleLanguage,
                toggleTheme
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}