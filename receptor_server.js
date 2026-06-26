const express = require('express');
const cors = require('cors');
const app = express();

const PUERTO = 3000;

/* Historial de los escaneos realizados */
const historial = [];

app.use(cors());
app.use(express.json());

app.post('/api/escanear', (req, res) => {

    /* URL recibida desde el Frontend */
    const urlRecibida = req.body.url;

    console.log(`[ALERTA] Objetivo recibido en coordenadas: ${urlRecibida}`);

    /* Crear un nuevo registro del escaneo */
    const entrada = {
        url: urlRecibida,
        fecha: new Date().toLocaleString(),
        estado: 'ESCANEADO'
    };

    /* Guardar el registro en el historial */
    historial.push(entrada);

    /* Mantener solo los últimos 50 escaneos */
    if (historial.length > 50) {
        historial.shift();
    }

    /* Enviar la respuesta junto con el historial */
    res.json({
        estado: 'EXITO',
        mensaje: '[ENLACE ESTABLECIDO]: Servidor a la espera del Robot.',
        objetivo: urlRecibida,
        historial
    });

});

/* Iniciar el servidor */
app.listen(PUERTO, () => {
    console.log(`[BÚNKER CENTRAL]: Escuchando comunicaciones en puerto ${PUERTO}.`);
});