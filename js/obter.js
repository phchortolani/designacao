
import xlsx from 'xlsx'
import gts from 'excel-date-to-js'
const { readFile, utils } = xlsx;
const { getJsDateFromExcel } = gts;
import moment from 'moment/moment.js';

const file = readFile('./planilha/pla.xlsx')


export function Obter() {

    let data = []

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = utils.sheet_to_json(file.Sheets[file.SheetNames[i]])

        temp.forEach((res) => {

            if (res.Dia) {
                res["Dia"] = TrocarData(res.Dia)
            }

            data.push(res)
        })
    }


    return data;
}

export function ObterPorData(DataPesquisa) {
    const listaDesignados = Obter();
    return listaDesignados.filter((e) => e.Dia == DataPesquisa)
}

function TrocarData(data) {
    return moment(getJsDateFromExcel(data)).add(1, 'day').format("DD/MM/yyyy");
}