// Se cambia la carga del json local
// a un json en AWS SERVIDO EN UN LAMBDA
// el cual podra modificarse desde esta interfaz

  export const JSON_PROFILE = async () => fetch('https://hrws8ne1hk.execute-api.us-east-1.amazonaws.com/dev/v1/struct')
  .then(response => response.json())