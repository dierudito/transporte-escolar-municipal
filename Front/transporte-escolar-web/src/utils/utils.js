export const translateStatus = (status) => {
    const translations = {
      'pending': 'Pendente',
      'approved': 'Aprovado',
      'rejected': 'Rejeitado',
      'canceled': 'Cancelado'
    };
    return translations[status.toLowerCase()] || status;
  };
  
  export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
  
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    const regexes = {
      '10': /^\(?(\d{2})\)?\s?(\d{4})-?(\d{4})$/, // (XX) XXXX-XXXX
      '11': /^\(?(\d{2})\)?\s?(\d{5})-?(\d{4})$/, // (XX) 9XXXX-XXXX
      '8': /^(\d{4})-?(\d{4})$/, // XXXX-XXXX
      '9': /^(\d{5})-?(\d{4})$/ // 9XXXX-XXXX
    };
  
    const regex = regexes[cleaned.length];
  
    if (regex) {
      const parts = cleaned.match(regex);
      if (parts) {
        if (cleaned.length === 10 || cleaned.length === 11){
          return `(${parts[1]}) ${parts[2]}-${parts[3]}`;
        } else {
          return `${parts[1]}-${parts[2]}`;
        }
  
      }
    }
  
    return cleaned;
  };

  export const formatCEP = (cep) => {
  if (!cep) return '';

  const cleaned = cep.replace(/\D/g, '');

  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  return cleaned;
};