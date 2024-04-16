import { Estado } from "./estado";
import { Website } from "./website";

export const WEBSITES: Website[] = [
    { id: 1, url: 'test1', estado: Estado.PorAvaliar },
    { id: 2, url: 'test2', estado: Estado.Erro },
    { id: 3, url: 'test3', estado: Estado.Avaliado },
    { id: 4, url: 'test4', estado: Estado.EmAvaliacao }
]