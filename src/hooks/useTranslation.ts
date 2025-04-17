import { useApp } from '@/contexts/AppContext';
import { translate } from '@/utils/translations';

export function useTranslation() {
  const { language } = useApp();
  
  const t = (key: string): string => {
    return translate(key, language);
  };
  
  return { t, language };
}