
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import { Obter, ObterPorData } from './js/obter.js'
import cors from 'cors'

/* app.use(app.static('public'))

app.use(app.json({ limit: '50mb' })); */

app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/', (req, res) => {

    return res.json({ StatusPesquisa: "false" });

})

app.get('/Obter/:data', (req, res) => {


    let ret = ObterPorData(req.params.data.replaceAll('-', '/'));

    if (ret.length == 0) return res.send({ StatusPesquisa: "false" });
    else res.json({ ret, StatusPesquisa: "true" })

})

app.get('/Obter', (req, res) => {

    let ret = Obter();
    if (ret.length == 0) return res.send({ StatusPesquisa: "false" });
    else res.json({ ret, StatusPesquisa: "true" })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})