/* Captura de elementos de la interfaz */

const inputObjetivo = document.getElementById('target-url');
const botonEscaneo = document.getElementById('btn-scan');

const panelVista = document.querySelector('#panel-vista .contenido-panel');
const panelTech = document.querySelector('#panel-tecnologia .contenido-panel');
const listaHistorial = document.getElementById('lista-historial');

/* Evento del botón */

botonEscaneo.addEventListener('click', iniciarOperacion);

/* Enviar la URL al servidor */

async function iniciarOperacion() {

    const urlIngresada = inputObjetivo.value.trim();

    if (urlIngresada === '') {
        alert('[ERROR TÁCTICO]: Ingrese un dominio objetivo válido.');
        return;
    }

    panelVista.innerHTML =
        '<span style="color: var(--color-alerta)">[CONECTANDO SONDAS...]</span>';

    panelTech.innerHTML =
        '<span style="color: var(--color-alerta)">[ENVIANDO PAQUETE AL SERVIDOR...]</span>';

    inputObjetivo.value = '';

    try {

        const respuesta = await fetch('http://localhost:3000/api/escanear', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                url: urlIngresada
            })

        });

        const datos = await respuesta.json();

        /* Mostrar el estado del servidor */

        panelTech.innerHTML =
            `<span style="color: var(--color-terminal)">
                ${datos.mensaje}
            </span>`;

        /* Actualizar el historial recibido */

        listaHistorial.innerHTML = '';

        datos.historial.forEach(item => {

            listaHistorial.innerHTML += `
                <li>
                    <strong>${item.url}</strong><br>
                    <small>${item.fecha}</small>
                </li>
            `;

        });

    } catch (error) {

        console.error(error);

        panelTech.innerHTML =
            '<span style="color:red">[FALLO DE CONEXIÓN CON BÚNKER CENTRAL]</span>';

    }

}