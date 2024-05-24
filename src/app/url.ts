import { Estado } from "./estado";
import { EstadoPag } from "./estadoPag";
import { Repo } from "./repo";

export interface Url{
    _id?: Object,
    link: string,
    estado: EstadoPag,
    ultima_aval: Date | null,
    errorA: boolean,
    errorAA: boolean,
    errorAAA: boolean,
    nTestesPassados: number,
    nTestesAvisos: number,
    nTestesFalhos: number,
    repos: Repo[]
}