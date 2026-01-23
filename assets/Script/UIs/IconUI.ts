import { _decorator, Button, Component, Node, RichText, Sprite } from 'cc';
import { UIBase } from '../FrameWork/UIBase';
import { ResManager } from '../FrameWork/ResManager';
import { IconData } from '../FrameWork/Tools/DataClass';
import { EventMgr } from '../FrameWork/EventManager';
const { ccclass, property } = _decorator;

@ccclass('IconUI')
export class IconUI extends Component{
    private _icon:Sprite = null;
    private _richText :RichText = null;
    private _buyBtn:Button = null;
    private _data:IconData = null;
    protected onLoad(): void {
        this._icon = this.getComponentInChildren(Sprite);
        this._richText = this.getComponentInChildren(RichText);
        this._buyBtn = this.getComponentInChildren(Button);

    }
    init(data:IconData){
        this._data = data;
        this._icon.spriteFrame = ResManager.Instance.getSpriteFrame(data.imgname);
        this._richText.string = `<color=#00ff00>名称：</color><color=#0fffff>${data.iconname}</color>\n<color=#00ff00>效果：</color><color=#0fffff><color=#00ff00>${data.result}</color><color=#0fffff>\n<color=#00ff00>价格：</color><color=#0fffff><color=#00ff00>${data.buy}</color><color=#0fffff>`;
    }

    protected start(): void {
        this._buyBtn.node.on(Button.EventType.CLICK,()=>{
            EventMgr.Instance.emit("buy",this._data);
        })
    }
}


