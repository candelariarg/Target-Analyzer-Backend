const express = require('express');
const cors = require('cors');
const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/escanear', (req, res) => {
    const urlRecibida = req.body.url;
    console.log(`[ALERTA] Objetivo recibido en coordenadas: ${urlRecibida}`);

    res.json({
        estado: `EXITO`,
        mensaje: `[ENLACE ESTABLECIDO]: Servidor a la espera del Robot.`,
        objetivo: urlRecibida
    });
});

app.listen(PUERTO, () => {
    console.log(`[BÚNKER CENTRAL]: Escuchando comunicaciones en puerto ${PUERTO}.`);
});
