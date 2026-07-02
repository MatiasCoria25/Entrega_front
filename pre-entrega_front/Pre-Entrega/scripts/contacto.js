const formularioNombre = document.getElementById('nombre');
const formularioCorreo = document.getElementById('correo');
const formularioTelefono = document.getElementById('telefono');
const formularioMensaje = document.getElementById('mensaje');
const formularioContacto = document.getElementById('formulario');

document.addEventListener('DOMContentLoaded', () => {
    formularioNombre.value = localStorage.getItem('nombre_contacto')       || '';
    formularioCorreo.value = localStorage.getItem('correo_contacto')       || '';
    formularioTelefono.value = sessionStorage.getItem('telefono_contacto') || '';
    formularioMensaje.value = sessionStorage.getItem('mensaje_contacto')   || '';
});

formularioNombre.addEventListener('input', () => {
    localStorage.setItem('nombre_contacto', formularioNombre.value);
});

formularioCorreo.addEventListener('input', () => {
    localStorage.setItem('correo_contacto', formularioCorreo.value);
});

formularioTelefono.addEventListener('input', () => {
    sessionStorage.setItem('telefono_contacto', formularioTelefono.value);
});

formularioMensaje.addEventListener('input', () => {
    sessionStorage.setItem('mensaje_contacto', formularioMensaje.value);
})

formularioContacto.addEventListener('submit', (event) => {
    event.preventDefault();

    sessionStorage.removeItem('telefono_contacto');
    sessionStorage.removeItem('mensaje_contacto');

    formularioNombre.value = '';
    formularioCorreo.value = '';
    formularioTelefono.value = '';
    formularioMensaje.value = '';

    const alerta = document.createElement('div');
    alerta.textContent = '¡Formulario enviado con éxito!';
    alerta.style.position = 'fixed';
    alerta.style.top = '20px';
    alerta.style.left = '50%';
    alerta.style.transform = 'translateX(-50%)';
    alerta.style.backgroundColor = '#4CAF50';
    alerta.style.color = 'white';
    alerta.style.padding = '10px 20px';
    alerta.style.borderRadius = '5px';
    alerta.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    alerta.style.zIndex = '1000';

    document.body.appendChild(alerta);

    // Eliminar la alerta después de unos segundos
    setTimeout(() => {
        alerta.remove();
    }, 4000);
});




 
