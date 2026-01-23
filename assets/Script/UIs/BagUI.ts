import { _decorator, Component, Label, Node, NodeEventType, Sprite } from 'cc';
import { EventMgr } from '../FrameWork/EventManager';
import { IconData } from '../FrameWork/Tools/DataClass';
import { ResManager } from '../FrameWork/ResManager';
import { WinUI } from './WinUI';
const { ccclass, property } = _decorator;

@ccclass('BagUI')
export class BagUI extends WinUI {
    private _icons:{icon:IconData,count:number}[]=[];
    private _contents:Node[]= [];
    onStart(...args: any[]): void {
        super.onStart();
        this._contents = this.getNode("_content").children;
        EventMgr.Instance.on('buy',this.buy,this);
        for(let i=0;i<this._contents.length;i++){
            this._contents[i].on(NodeEventType.TOUCH_END,()=>{
                if(this._icons[i]){
                    this.useIcon(i);
                }
            })
        }

        this.hide();

    }
    
    useIcon(i:number){
        const obj = this._icons[i];
        //消耗药品
        if(obj.icon.id<2000){
            EventMgr.Instance.emit('changeProperty',obj.icon)
        }
        else{
            EventMgr.Instance.emit('wear',obj.icon);
        }

        obj.count--;
        if(obj.count<=0){
            this.setIconImg(i,null);
            this._icons[i]=null;
        }
        this.setIconCount(i);
    }

    buy(icon:IconData){
        this.addIcon(icon);
    }
    addIcon(icon:IconData){
       for(let i=0;i<this._contents.length;i++){

        const obj = this._icons[i];
        if(!obj){
            this.showIcon(i,icon);
            break;
        }
        if(obj.icon.id ===icon.id){
            obj.count++;
            this.setIconCount(i);
            break;
        }
       } 
        
    }

    showIcon(i:number,data:IconData){
        this.setIconImg(i,data);
        this.setIconCount(i);
    }

    setIconImg(i:number,data:IconData){
        this._icons[i] = data?{icon:data,count:1}:null;
        this._contents[i].getComponentInChildren(Sprite).spriteFrame = 
        ResManager.Instance.getSpriteFrame(data?.imgname)
    }

    setIconCount(i:number){
        const lb:Label = this._contents[i].getComponentInChildren(Label);
        if(!this._icons[i]){
            lb.node.active= false;
            return;
        }
        lb.node.active = true;
        lb.string = this._icons[i].count+'';
    }
}


