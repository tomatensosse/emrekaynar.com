type Translations = {
    [key: string]: {
      en: string;
      tr: string;
      de: string;
    };
};

const translations: Translations = {
    language: {
        en: 'en',
        tr: 'tr',
        de: 'de',
    },
    login: {
        en: 'Login',
        tr: 'Giriş',
        de: 'Einloggen',
    },
    loggedInAs: {
        en: 'Logged in as',
        tr: 'Giriş yapıldı',
        de: 'Eingeloggt als',
    },
    logout: {
        en: 'Logout',
        tr: 'Çıkış',
        de: 'Ausloggen',
    },
    guest: {
        en: 'Continue as guest...',
        tr: 'Misafir olarak devam et...',
        de: 'Als Gast fortfahren...',
    },

    // Sections
    music: {
        en: "MUSIC",
        tr: "MÜZİK",
        de: "MUSIK",
    },
    software: {
        en: "SOFTWARE",
        tr: "YAZILIM",
        de: "SOFTWARE",
    },
    other: {
        en: "OTHER",
        tr: "DİĞER",
        de: "ANDERE",
    },

    // Software section
    softwareProjects: {
        en: 'Software projects will appear here.',
        tr: 'Yazılım projeleri burada görünecek.',
        de: 'Softwareprojekte werden hier angezeigt.'
    },
    project: {
        en: 'Project',
        tr: 'Proje',
        de: 'Projekt'
    },
    comingSoon: {
        en: 'Description coming soon.',
        tr: 'Açıklama yakında eklenecek.',
        de: 'Beschreibung folgt in Kürze.'
    },

    // Other section
    otherContent: {
        en: 'Other content will appear here.',
        tr: 'Diğer içerikler burada görünecek.',
        de: 'Andere Inhalte werden hier angezeigt.'
    },
    otherItem: {
        en: 'Other Item',
        tr: 'Diğer Öğe',
        de: 'Anderes Element'
    }
}

export function translate(key: string, language: 'en' | 'tr' | 'de'): string {
    if (!translations[key]) {
        console.warn(`Translation key "${key}" not found`);
        return key;
    }
    
    return translations[key][language];
}
  
export default translations;