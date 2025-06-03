export const formatDate = (
  dateString: string,
  language: 'fr' | 'en' = 'fr'
): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', options);
};

export const formatDateTime = (
  dateString: string,
  language: 'fr' | 'en' = 'fr'
): string => {
  const date = new Date(dateString);
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  
  const formattedDate = date.toLocaleDateString(
    language === 'fr' ? 'fr-FR' : 'en-US',
    dateOptions
  );
  
  const formattedTime = date.toLocaleTimeString(
    language === 'fr' ? 'fr-FR' : 'en-US',
    timeOptions
  );
  
  return `${formattedDate} ${language === 'fr' ? 'à' : 'at'} ${formattedTime}`;
};

export const formatCurrency = (
  amount: number,
  currency: string = 'XAF',
  language: 'fr' | 'en' = 'fr'
): string => {
  return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};