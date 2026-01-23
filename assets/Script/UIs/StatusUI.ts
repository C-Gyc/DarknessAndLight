import { _decorator, Component, Label, Node } from 'cc';
import { WinUI } from './WinUI';
import { EventMgr } from '../FrameWork/EventManager';
const { ccclass, property } = _decorator;

@ccclass('StatusUI')
export class StatusUI extends WinUI {
    onStart(): void {
        super.onStart();
        EventMgr.Instance.on('change',this.change,this);
        this.hide();
    }
    change(nodeName:string,content:string){
        const node = this.getNode(nodeName);
        if(!node){
            return;
        }
        node.getComponent(Label).string = content;
    }

}


