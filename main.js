//url API
const URL = 'https://api.validations.truora.com/v1/validations/';
//Authorization header 
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiIiwiYWRkaXRpb25hbF9kYXRhIjoie30iLCJjbGllbnRfaWQiOiJUQ0kzY2EzNDFjNGQ5Njc2MDQ2ZjI2ZDFmOGJkMDQyMDBjNyIsImV4cCI6MzI3MzU4ODMwNCwiZ3JhbnQiOiIiLCJpYXQiOjE2OTY3ODgzMDQsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vdXMtZWFzdC0xXzZRcXBPblF2NyIsImp0aSI6IjM0ZTRhYjc3LTQxYjMtNDIxMy04N2Q4LWZhMDI5M2FmOGQyYSIsImtleV9uYW1lIjoicHJ1ZWJhX3RlY25pY2FfaGFtYWwiLCJrZXlfdHlwZSI6ImJhY2tlbmQiLCJ1c2VybmFtZSI6InRydW9yYW5hb3MtcHJ1ZWJhX3RlY25pY2FfaGFtYWwifQ.gpyfPT-DprI3s3Fah7--46sr-ZkGWduJx3L_b9zmWA4';
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

var validation_id;

async function main() {

    // Obtener elementos de entrada de archivo
    const frontImageInput = document.getElementById('frontImage');
    const backImageInput = document.getElementById('reverseImage');

    // Verificamos que se hayan cargado ambas imagenes
    if (!frontImageInput.files[0] || !backImageInput.files[0]) {
        alert('Por favor, carga ambas imágenes del documento.');
        return null; // Devolver null o manejar el caso de error de alguna manera
    } else {
        const images = new FormData();
        // Agregamos las imágenes al objeto FormData
        images.append('frontImage', frontImageInput.files[0]);
        images.append('reverseImage', backImageInput.files[0]);

        //Guardamos las imagenes en variables
        const frontImage = images.get('frontImage');
        const reverseImage = images.get('reverseImage');

        //Cargamos la información de la validación requerida
        const dataValidation = await createValidation(); 
        console.log('**********',dataValidation);
        const urlFront = dataValidation.instructions.front_url;
        const urlReverse = dataValidation.instructions.reverse_url;
        validation_id = dataValidation.validation_id;
    

        //Realizamos petición 'PUT' 
        uploadFrontImage(urlFront, frontImage);
        uploadReverseImage(urlReverse, reverseImage);

        //Activamos el boton de validar documento para respetar el flujo de nuestro programa 
        const button = document.getElementById("validateButton");
        button.disabled = false;

    }

}

async function createValidation() {
    try {  
        const formData = new URLSearchParams();
        formData.append('type', 'document-validation');
        formData.append('country', 'CO');
        formData.append('document_type', 'national-id');
        formData.append('user_authorized', true);

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Truora-API-Key': API_KEY,
            },
            body: formData,
        });

        const data = await res.json(); //Permite convertir la respuesta en un objeto JavaScript
        console.log(res);
        return data;
}
    catch (error) {
    console.error('Error durante la validación:', error); 
}
}

async function uploadFrontImage(urlFront, frontImage) {
    const authorizationHeader = `Bearer ${API_KEY}`;
    try {
        console.log(urlFront);
        const response = await fetch(corsAnywhereUrl + urlFront, {
            method: 'PUT',
            headers: {
                'Content-Type': 'binary',
                'Authorization' : authorizationHeader,
            },
            body: frontImage,
        });

        if (!response.ok) {
            throw new Error('Error al subir las imágenes. Código de estado: ' + response.status);
        }

        const data = await response.json();
        console.log('Imágenes subidas con éxito:', data);
    } catch (error) {
        console.error('Error durante la carga de imágenes:', error);
    }
}

async function uploadReverseImage(urlReverse, reverseImage) {
    try {
        const response = await fetch(corsAnywhereUrl + urlReverse, {
            method: 'PUT',
            headers: {
                'Truora-API-Key': API_KEY,
            },
            body: reverseImage,
        });

        if (!response.ok) {
            throw new Error('Error al subir las imágenes. Código de estado: ' + response.status);
        }

        const data = await response.json();
        console.log('Imágenes subidas con éxito:', data);
    } catch (error) {
        console.error('Error durante la carga de imágenes:', error);
    }
}

async function validateDocument() {
    try {
        const response = await fetch(URL+validation_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Truora-API-Key': API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error('Error validación. Código de estado: ' + response.status);
        }

        const data = await response.json();
        console.log('Validación exitosa:', response);
        console.log('*****', data);
    } catch (error) {
        console.error('Error durante la validación:', error);
        }
    
}