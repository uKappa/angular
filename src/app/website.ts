import { Estado } from "./estado";

export interface Website {
    _id: Object,
    url: string,
    /*estado: {
        type: String,
        required: true,
        enum: ["PorAvaliar", "EmAvaliacao", "Avaliado", "Erro"],
        default: "PorAvaliar",
      }*/
    estado: Estado,
    urls: string[]
    //data registo, data ultima avaliacao, talvez lista de urls especificos do site
}