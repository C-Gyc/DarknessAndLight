import { _decorator, Component, Node, NodeEventType, Sprite } from 'cc';
import { UIBase } from '../FrameWork/UIBase';
import { EventMgr } from '../FrameWork/EventManager';
import { IconData } from '../FrameWork/Tools/DataClass';
import { ResManager } from '../FrameWork/ResManager';
import { WinUI } from './WinUI';
const { ccclass, property } = _decorator;

const Location =['Headgear','Armor','RightHand','Lefthand','Shoe','Accessory'];
@ccclass('EquipUI')
export class EquipUI extends WinUI {
    private _icons:IconData[]=[];

    private _content:Node[]=[];
    onStart(): void {
        super.onStart();
        this._content = this.getNode('_content').children;
        EventMgr.Instance.on('wear',this.wear,this);
        //脱装备
        for(let i=0;i<this._content.length;i++){
            this._content[i].on(NodeEventType.TOUCH_END,()=>{
                if(this._icons[i]){
                    this.remove(i);
                }
            })
        }
        this.hide();
    }

    wear(icon:IconData){
       const index = Location.indexOf(icon.location);
       if(index!==-1){
        if(this._icons[index]){
            this.remove(index);
        }
        //人物属性变化
        EventMgr.Instance.emit('changeProperty',icon)
        //记录穿戴的物品
        this._icons[index]=icon;
        //装备栏显示
        this.iconShow(index,icon);
       

       }
    }

    remove(index:number){ 
         //属性变化
        EventMgr.Instance.emit('changeProperty',this._icons[index],-1);
        //还到背包
        EventMgr.Instance.emit('buy',this._icons[index]);
      
        //装备栏清除
        this.iconShow(index,null);
         //清除记录
        this._icons[index] = null;
    }

    iconShow(index:number,icon:IconData){
         this._content[index].getComponentInChildren(Sprite).spriteFrame = 
        ResManager.Instance.getSpriteFrame(icon?.imgname);
    }
}


