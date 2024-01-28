# Validador de documento de identidad 

## Introducción 
Este programa utiliza una API que, a través de imágenes proporcionadas de la parte frontal y reversa del documento de identidad, permite validar la autenticidad del documento y verificar la información proporcionada por el usuario.

## Funcionamiento 
El programa crea una página web muy sencilla que funciona de la siguiente manera:

1. Ingresamos la API-KEY suministrada.
2. Damos clic en el botón 'Ingresar clave'.
3. Se verifica la validez de la llave suministrada.
4. Mediante un mensaje emergente, confirmamos o rechazamos la llave.
5. En caso de que la llave no sea válida, no podremos continuar con el proceso de validación, y debemos ingresar una llave válida para continuar.
6. Si la llave es válida, debemos adjuntar las imágenes correspondientes a ambos lados del documento de identidad que se va a validar. Si no se adjuntan ambas imágenes, no podremos continuar.
7. Damos clic en el botón 'Cargar imágenes' para subir las imágenes y que estas puedan ser analizadas por el OCR (Optical Character Recognition).
8. Terminado este proceso, se habilita el botón 'Validar documento', y al hacer clic en este, se retorna el resultado final de la validación. 
