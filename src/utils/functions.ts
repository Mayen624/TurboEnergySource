import {successToast, errorToast, infoToast} from "@utils/notify.ts";

export function getURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('message') || '';
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const popResult = parts.pop();
    return popResult?.split(';')[0];
  }
  return undefined;
}

export function getURLMessage(message: string = 'URL_ERROR') {
  switch (message) {
    case 'unauthorized':
      errorToast('Acceso denegado', 'No estás autorizado para acceder a esta página.');
    break;
    case 'authorized':
      successToast('Bienvenido/a', 'Sesión iniciada.');
    break;
    case 'sessionClosed':
      infoToast('Aviso', 'La sesión fue cerrada.')
    break;
    case 'sessionExpired':
      infoToast('Aviso', 'La sesión a expirado.')
    break;
    case '':
      //Empty result
    break;
  }
}

export function deleteCookie(name: string) {
  if(name){
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }else{
    console.error('No se puede eliminar cookie.');
  }
}

export const isFormDataEmpty = (formData: FormData): boolean => {
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }
  }
  return false;
};

export const checkContactFormData = (firstName: string, lastName: string, email: string, phone: string, details: string): {isValid: boolean, errors: string[]} => {

  const errors: string[] = [];

  // Validación de nombre (permite letras con acentos, espacios, guiones y apóstrofes)
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+([\s'-][a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/;

  if (!firstName || firstName.length < 2 || firstName.length > 50 || !nameRegex.test(firstName) || /\s{2,}/.test(firstName)) {
    errors.push('Primer nombre debe tener entre 2 y 50 caracteres, solo letras');
  }

  if (!lastName || lastName.length < 2 || lastName.length > 50 || !nameRegex.test(lastName) || /\s{2,}/.test(lastName)) {
    errors.push('Apellido debe tener entre 2 y 50 caracteres, solo letras');
  }

  // Validación de email (RFC 5321 compliant)
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]{0,63})[a-zA-Z0-9]@[a-zA-Z0-9]([a-zA-Z0-9.-]{0,253})[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

  if (!email || email.length > 254 || email.includes('..') || email.split('@').length !== 2 || !emailRegex.test(email)) {
    errors.push('Email inválido (ejemplo: usuario@dominio.com)');
  } else {
    const [localPart, domain] = email.split('@');
    if (localPart.length > 64 || domain.length > 253) {
      errors.push('Email inválido (ejemplo: usuario@dominio.com)');
    }
  }

  // Validación de teléfono internacional (ITU-T E.164)
  const phoneRegex = /^\+[1-9]\d{0,3}[\s.-]?(\(?\d{1,4}\)?[\s.-]?)?\d{4,14}$/;
  const digitsOnly = phone.replace(/\D/g, '');

  if (!phone || digitsOnly.length < 7 || digitsOnly.length > 15 || !phoneRegex.test(phone)) {
    errors.push('Teléfono inválido (ejemplo: +1 2345678900, +52 1234567890)');
  }

  // Validación de detalles
  if (!details || details.trim().length < 10 || details.trim().length > 300) {
    errors.push('Los detalles deben tener entre 10 y 300 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

