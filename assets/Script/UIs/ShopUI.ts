import { _decorator, Component, Node } from 'cc';
import { UIBase } from '../FrameWork/UIBase';
const { ccclass, property } = _decorator;

@ccclass('ShopUI')
export class ShopUI extends UIBase {
    onUse(...args: any[]): void {
        
    }
    close(){
        this.hide();
   }
}


