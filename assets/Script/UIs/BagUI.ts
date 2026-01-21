import { _decorator, Component, Node } from 'cc';
import { PopWin, UIBase } from '../FrameWork/UIBase';
const { ccclass, property } = _decorator;

@ccclass('BagUI')
export class BagUI extends PopWin {
    close(){
        this.hide();
    }
}


