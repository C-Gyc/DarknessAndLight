import { _decorator, CCInteger, Component, Node, physics } from 'cc';
import { EventMgr } from '../../FrameWork/EventManager';
import { UIManager } from '../../FrameWork/UIManager';
import { UIName } from '../../FrameWork/Tools/UIConfig';
import { UIType } from '../../FrameWork/UIBase';
const { ccclass, property } = _decorator;

@ccclass('Npc')
export class Npc extends Component {
    @property(Node)
    playerNode:Node = null;

    @property(CCInteger)
    id:number = 0;
    start() {
        EventMgr.Instance.on('ray',this.onTouch,this);
    }

    isNear(){
        return this.node.worldPosition.clone().subtract(this.playerNode.worldPosition).length() <= 5;
    }
    onTouch(item:physics.PhysicsRayResult){
        if(item.collider.node === this.node&&this.isNear()){
            UIManager.Instance.openUI(UIName.ShopUI,UIType.Widget,this.id);
        }
    }
    update(deltaTime: number) {
        
    }
}


