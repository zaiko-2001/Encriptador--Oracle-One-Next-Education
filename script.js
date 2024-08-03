// Diccionario de cifrado
const diccionarioCifrado = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

// Diccionario de descifrado
const diccionarioDescifrado = {
    "enter": "e",
    "imes": "i",
    "ai": "a",
    "ober": "o",
    "ufat": "u"
};

// Función para cifrar el texto
function cifrar(texto) {
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
        let letra = texto.charAt(i);
        if (diccionarioCifrado.hasOwnProperty(letra)) {
            resultado += diccionarioCifrado[letra];
        } else {
            resultado += letra;
        }
    }
    return resultado;
}

// Función para descifrar el texto
function descifrar(texto) {
    let resultado = '';
    for (let clave in diccionarioDescifrado) {
        let valor = diccionarioDescifrado[clave];
        while (texto.includes(clave)) {
            texto = texto.replace(clave, valor);
        }
    }
    resultado = texto;
    return resultado;
}

// Evento para el botón de cifrado
document.getElementById('cifrar').addEventListener('click', function() {
    let texto = document.getElementById('placeholder').value;
    let resultado = cifrar(texto);

    // Cambiar el contenido de los elementos
    document.querySelector('.resultado').textContent = resultado;
    document.querySelector('.main_muneco').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><text y='50%' x='50%' dominant-baseline='middle' text-anchor='middle' font-size='20'>" + " " + "</text></svg>";
    document.querySelector('.main_caja_1').textContent = " ";
    document.querySelector('.main_caja_2').textContent = " ";

    // Asegúrate de que el botón de copiar esté visible
    document.getElementById('copiar').style.display = 'block';
    // El botón de pegar debería estar visible solo si se ha copiado algo
    document.getElementById('pegar').style.display = 'none';
});

// Evento para el botón de descifrado
document.getElementById('descifrar').addEventListener('click', function() {
    let texto = document.getElementById('placeholder').value;
    let resultado = descifrar(texto);

    // Cambiar el contenido de los elementos
    document.querySelector('.resultado').textContent = resultado;
    document.querySelector('.main_muneco').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><text y='50%' x='50%' dominant-baseline='middle' text-anchor='middle' font-size='20'>" + " " + "</text></svg>";
    document.querySelector('.main_caja_1').textContent = " ";
    document.querySelector('.main_caja_2').textContent = " ";

    // Asegúrate de que el botón de copiar esté visible
    document.getElementById('copiar').style.display = 'block';
    // El botón de pegar debería estar visible solo si se ha copiado algo
    document.getElementById('pegar').style.display = 'none';
});

// Evento para el botón de copiar
document.getElementById('copiar').addEventListener('click', function() {
    let resultado = document.querySelector('.resultado').textContent;

    // Crear un elemento temporal para copiar el texto
    let elementoTemporal = document.createElement('textarea');
    elementoTemporal.value = resultado;
    document.body.appendChild(elementoTemporal);

    // Seleccionar el texto y copiarlo al portapapeles
    elementoTemporal.select();
    document.execCommand('copy');

    // Eliminar el elemento temporal
    document.body.removeChild(elementoTemporal);

     // Mostrar el mensaje de notificación
     let notification = document.getElementById('notification');
     notification.style.display = 'block';
 
     // Ocultar el mensaje después de 3 segundos
     setTimeout(function() {
         notification.style.display = 'none';
     }, 1000);
    // Mostrar el botón de pegar
    document.getElementById('pegar').style.display = 'block';
});

// Evento para el botón de pegar
document.getElementById('pegar').addEventListener('click', function() {
    // Pegar el texto del portapapeles en el input
    navigator.clipboard.readText().then(text => {
        document.getElementById('placeholder').value = text;
    });

    // El botón de pegar permanece visible
    // document.getElementById('pegar').style.display = 'none'; // Esta línea ha sido eliminada
});

// Evento para limpiar el input
document.getElementById('clear-input').addEventListener('click', function() {
    const inputField = document.getElementById('placeholder');
    inputField.value = '';
    inputField.dispatchEvent(new Event('input')); // Dispara el evento input para actualizar la visibilidad del botón
});

// Evento para mostrar/ocultar el botón de limpiar
document.getElementById('placeholder').addEventListener('input', function() {
    const inputText = this.value;
    const clearButton = document.getElementById('clear-input');

    if (inputText) {
        clearButton.classList.remove('hidden');
    } else {
        clearButton.classList.add('hidden');
    }
});

// Ajustar el diseño en función del tamaño de la ventana
function adjustLayout() {
    const width = window.innerWidth;

    if (width < 800) {
        document.querySelector('body').style.fontSize = '12px';
        document.querySelector('.header_imagen').style.width = '100px';
        document.querySelector('.main_titulo').style.width = '80%';
        document.querySelector('.rectangulo').style.flexDirection = 'column';
    } else {
        document.querySelector('body').style.fontSize = '16px';
        document.querySelector('.header_imagen').style.width = '100px';
        document.querySelector('.main_titulo').style.width = '50%';
        document.querySelector('.rectangulo').style.flexDirection = 'row';
    }
}

window.addEventListener('resize', adjustLayout);
window.addEventListener('load', adjustLayout);
