
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import { Obter, ObterPorData } from './js/obter.js'
import cors from 'cors'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());

    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
})

app.get('/Obter/:data', (req, res) => {
    let ret = ObterPorData(req.params.data.replaceAll('-', '/'));

    if (ret.length == 0) res.send({ StatusPesquisa: false });
    else res.json({ ret, StatusPesquisa: true })

})

app.get('/Obter', (req, res) => {
    let ret = Obter();
    if (ret.length == 0) res.send({ StatusPesquisa: false });
    else res.json({ ret, StatusPesquisa: true })
})

app.listen(port, () => {
    if (port === 3000) console.log(`Example app listening on port: http://localhost:${port}`)
    else console.log(`exec in port from server: ${port}`)

})