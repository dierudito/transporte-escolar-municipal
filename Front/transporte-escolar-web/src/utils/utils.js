export const translateStatus = (status) => {
    const translations = {
      'pending': 'Pendente',
      'approved': 'Aprovado',
      'rejected': 'Rejeitado',
      'canceled': 'Cancelado'
    };
    return translations[status.toLowerCase()] || status;
  };
  
  export const fomartDatePtBr = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  export const fomartDateEnUs = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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

export const formatCPF = (cpf) => {
  if (!cpf) return '';
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return cpf;
};

export const validateCPF = (cpf) => {
    if (!cpf) return false;

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let digit1 = remainder >= 10 ? 0 : remainder;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let digit2 = remainder >= 10 ? 0 : remainder;

    if (parseInt(cpf.charAt(9)) !== digit1 || parseInt(cpf.charAt(10)) !== digit2) {
        return false;
    }

    return true;
};