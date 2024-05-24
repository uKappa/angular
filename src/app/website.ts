import { Estado } from "./estado";
import { Url } from "./url";

export interface Website {
    _id: Object,
    url: Url,
    /*estado: {
        type: String,
        required: true,
        enum: ["PorAvaliar", "EmAvaliacao", "Avaliado", "Erro"],
        default: "PorAvaliar",
      }*/
    estado: Estado,
    data_registo: Date,
    urls: Url[],
    pagErrorA: number,
    pagErrorAA: number,
    pagErrorAAA: number,
    //data registo, data ultima avaliacao, talvez lista de urls especificos do site
}