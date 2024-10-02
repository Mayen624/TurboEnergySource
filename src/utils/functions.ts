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

