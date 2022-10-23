
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import { ObterPorData } from './js/obter.js'

app.use(Express.static('public'))

app.use(Express.json({ limit: '50mb' }));

app.get('/', (req, res) => {

    return res.send("isRunning");

})

app.get('/Obter/:data', (req, res) => {

    let ret = ObterPorData(req.params.data.replaceAll('-', '/'));

    if (ret.length == 0) return res.send({ StatusPesquisa: "false" });
    else res.json({ ret, StatusPesquisa: "true" })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})