import { Estado } from "./estado";

export interface Website {
    id: number,
    url: String,
    /*estado: {
        type: String,
        required: true,
        enum: ["PorAvaliar", "EmAvaliacao", "Avaliado", "Erro"],
        default: "PorAvaliar",
      }*/
    estado: Estado,
    urls: String[]
    //data registo, data ultima avaliacao, talvez lista de urls especificos do site
}