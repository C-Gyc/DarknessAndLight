import { DataBase } from "../DataMgr";

export interface IconData extends DataBase {
    iconname: string;
    imgname: string;
    type: string;
    hp: number;
    mp: number;
    atk: number;
    def: number;
    speed: number;
    location: string;
    vocaion: string;
    sell: number;
    buy: number;
    result: string;
    npcid: number;
}