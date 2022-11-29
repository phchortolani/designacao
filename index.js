import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Express from 'express'
import { Obter, ObterPorData } from './js/obter.js'
import Cors from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Express()
const port = process.env.PORT || 3000

app.use(Express.static('public'))

app.use(Express.json({ limit: '50mb' }));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(Cors());

    next();
});

app.get('/', (req, res) => {
    if (!__dirname) return console.log("in get without dirname")
    res.sendFile(__dirname + '/public/view/index.html');
})

app.get('/Obter/:data', (req, res) => {
    let ret = "";
  ;
    console.log(req.params);

    if(req.params?.data){
       let dataPesquisa = req.params.data.toString();
       console.log(dataPesquisa);
       ret = ObterPorData(dataPesquisa.replaceAll('-', '/'));
       
    }
   

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