import { _decorator, Component, EventTouch, Node, NodeEventType, Vec3 } from 'cc';
import { UIBase } from '../FrameWork/UIBase';
const { ccclass, property } = _decorator;

@ccclass('WinUI')
export class WinUI extends UIBase {


    close(){
        this.hide();
    }

    onStart(...args: any[]): void {
        this.node.on(NodeEventType.TOUCH_MOVE,(e:EventTouch)=>{
            const pos = e.getUIDelta();
            this.node.translate(new Vec3(pos.x,pos.y,0));
            this.node.setSiblingIndex(10);
        })
    }
    onUse(...args: any[]): void {
        this.node.setSiblingIndex(10);
    }
    unUse(): void {
        this.node.setSiblingIndex(0);
    }
}


