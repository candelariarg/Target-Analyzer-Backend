const express = require('express');
const cors = require('cors');
const app = express();
const PUERTO = 3000;

/* Historial de los escaneos realizados */
const historial = [];

/* configuracion del servidor */
const LIMITE_HISTORIAL = 50;
const LIMITE_ESCANEOS = 100;

let totalEscaneos = 0;


app.use(cors());
app.use(express.json());

    /* Verificar si el texto recibido es una URL válida */
    function esUrlValida(url) {
        
        try {
            
            new URL(url);
            return true;

    } catch {

        return false;

    }

}


app.post('/api/escanear', (req, res) => {

    /* Verificar si se alcanzó el límite de escaneos */
    if (totalEscaneos >= LIMITE_ESCANEOS){
        
        return res.status(403).json({
            estado: 'ERROR',
            mensaje: '[LÍMITE ALCANZADO]: No se permiten más escaneos.',
            totalEscaneos,
            limite: LIMITE_ESCANEOS
        });
    }

    /* URL recibida desde el Frontend */
    const urlRecibida = req.body.url;

    /* Validar que la URL tenga un formato correcto */
     if (!esUrlValida(urlRecibida)) {
        
        return res.status(400).json({
            estado: 'ERROR',
            mensaje: '[URL INVALIDA]: ingrese una direccion web valida'
        });
        
     }

    console.log(`[ALERTA] Objetivo recibido en coordenadas: ${urlRecibida}`);

    /* Crear un nuevo registro del escaneo */
    const entrada = {
        id: totalEscaneos + 1,
        url: urlRecibida,
        fecha: new Date().toLocaleString(),
        estado: 'ESCANEADO'
    };

    /* Guardar el registro en el historial */
    historial.push(entrada);

    /* esto incrementa el contados de los escaneos */
    totalEscaneos++;


    /* Mantener solo los últimos 50 escaneos */
    if (historial.length >  LIMITE_HISTORIAL) {
        historial.shift();
    }

    /* Enviar la respuesta junto con el historial */
    res.json({
        estado: 'EXITO',
        mensaje: '[ENLACE ESTABLECIDO]: Servidor a la espera del Robot.',
        objetivo: urlRecibida,
        historial,
        totalEscaneos,
        limite: LIMITE_ESCANEOS
    });

});

/* Iniciar el servidor */
app.listen(PUERTO, () => {
    console.log(`[BÚNKER CENTRAL]: Escuchando comunicaciones en puerto ${PUERTO}.`);
});