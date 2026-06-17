const inputObjetivo = document.getElementById('target-url');
const botonEscaneo = document.getElementById('btn-scan');
const panelVista = document.querySelector('#panel-vista .contenido-panel');
const panelTech = document.querySelector('#panel-tech .contenido-panel');
const panelEnlaces = document.querySelector('#panel-enlaces .contenido-panel');

botonEscaneo.addEventListener('click', iniciarOperacion);

async function iniciarOperacion() {
    const urlIngresada = inputObjetivo.value;
    if (urlIngresada === '') {
        alert('[ERROR TÁCTICO]: Ingrese un dominio objetivo válido.');
        return;
    }

    panelVista.innerHTML = '<span style="color: var(--color-alerta)">[CONECTANDO SONDAS...]</span>';
    panelTech.innerHTML = '<span style="color: var(--color-alerta)">[ENVIANDO PAQUETE AL SERVIDOR...]</span>';

    inputObjetivo.value = '';
    try {
        const respuesta = await fetch('http://localhost:3000/api/escanear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlIngresada })
        });
        const datos = await respuesta.json();

        panelTech.innerHTML = `<span style="color: var(--color-terminal)">${datos.mensaje}</span>`;
        panelEnlaces.innerHTML = `<span style="color: var(--color-terminal)">Objetivo en servidor: ${datos.objetivo}</span>`;

    } catch (error) {
        panelTech.innerHTML = '<span style="color: red">[FALLO DE CONEXIÓN CON BÚNKER CENTRAL]</span>';
    }
}