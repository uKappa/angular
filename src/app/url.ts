import { Estado } from "./estado";
import { EstadoPag } from "./estadoPag";

export interface Url{
    _id?: Object,
    link: string,
    estado: EstadoPag,
    ultima_aval: Date | null
}