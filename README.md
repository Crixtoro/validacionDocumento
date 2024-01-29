# Validador de documento de identidad 

## Introducción 
Este programa utiliza una API que; a través de imágenes proporcionadas del anverso y reverso del documento de identidad, permite validar la autenticidad del documento y verificar la información proporcionada por el usuario.

## Funcionamiento 
El programa crea una página web sencilla que funciona de la siguiente manera:

1. Ingresamos la API-KEY suministrada.
2. Damos clic en el botón 'Ingresar clave'.
3. Se verifica la validez de la llave suministrada.
4. Mediante una ventana emergente, informamos al usuario si la llave ingresada es válida - En caso de que la llave no lo sea, debemos ingresar una nueva para poder continuar. -
6. Procedemos a adjuntar la imagen correspondiente a cada lado del documneto. Para continuar con el proceso es obligatorio adjuntar ambas imagenes.
7. Damos clic en el botón 'Cargar imágenes' para subir las imágenes, en este paso las imagenes serán analizadas por el OCR (Optical Character Recognition).
8. Terminado el proceso anterior, se habilita el botón 'Validar documento', y al hacer clic en este, se retorna el resultado final de la validación.

### Observación: 
Si el resultado de la validación arroja el estado "validation_status": "pending", se puede deber a dos factores:
1.  has been blocked by CORS policy: El CORS ha bloqueado nuestra solicitud a la API, esto se soluciona entrando al DevTools de nuestro navegador, seleccionamos la pestaña Network, damos doble click en la petición que presenta el 'status code: 503', y habilitamos la opción "Request temporary access to the demo server"
  - Realizado este procedimiento se debe refrescar la pagina para iniciar de nuevo el proceso de validación. 
  
  ![image](https://github.com/Crixtoro/validacionDocumento/assets/111707866/ad6db7eb-bd0c-4c91-92f8-1dc25425edf2)
  
2. Si no encontramos ningún error, debemos dar clic de nuevo sobre el boton "Validar documento" (mientras se procesan las imagenes suministradas). 

