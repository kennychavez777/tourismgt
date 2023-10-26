import { Alert, ToastAndroid } from 'react-native';

export const messages = {
  'auth/claims-too-large': 'Tamaño excesivo. (Mayor a 1000 bytes).',
  'auth/email-already-exists': 'El correo ya ha sido previamente utilizado.',
  'auth/id-token-expired': 'Token expirado.',
  'auth/id-token-revoked': 'Token revocado.',
  'auth/insufficient-permission': 'Permisos insuficientes.',
  'auth/internal-error': 'Error interno en el servicio.',
  'auth/invalid-argument': 'Argumentos de autenticación inválidos',
  'auth/invalid-continue-uri': 'La uri debe de ser una cadena válida.',
  'auth/invalid-creation-time': 'Formato de fecha inválida.',
  'auth/invalid-credential': 'Credenciales invalidas.',
  'auth/invalid-email': 'Correo electrónico no válido.',
  'auth/invalid-email-verified': 'Correo electrónico verificado no válido',
  'auth/invalid-id-token': 'Token no válido.',
  'auth/invalid-password': 'Contraseña no válida.',
  'auth/invalid-photo-url': 'Valor de la foto no válida.',
  'auth/invalid-uid': 'UID invalido.',
  'auth/user-not-found': 'Usuario no encontrado.',
  'auth/uid-already-exists': 'El UID del usuario ya existe.',
  'auth/too-many-requests': 'Demasiadas peticiones, por favor espere un momento.',
  'auth/wrong-password': 'Las credenciales son inválidas.',
  'img/error-selection': 'Hubo un error al seleccionar la imagen.',
  'storage/object-not-found': 'No se encontró el archivo correspondiente.',
  'storage/unauthorized': 'El usuario no tiene permisos para acceder al objeto.',
  'storage/canceled': 'Se canceló la subida de la imagen.'
}

export const showError = (title: string, msg: string) => {
  Alert.alert(title, msg, [
    {
      text: 'Cerrar',
      onPress: () =>  console.log('Cerrar'),
      style: 'cancel'
    }
  ])
}

export const showToast = (msg: string) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};