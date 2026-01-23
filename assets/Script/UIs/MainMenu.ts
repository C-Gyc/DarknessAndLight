import { _decorator, Component, Node } from 'cc';
import { UIBase, UIType } from '../FrameWork/UIBase';
import { UIName } from '../FrameWork/Tools/UIConfig';
const { ccclass, property } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends UIBase {
   bag(){
        this.openUI(UIName.BagUI,UIType.Widget);
   }

   equip(){
     this.openUI(UIName.EquipUI,UIType.Widget);
   }
   skill(){
    }
    status(){
      this.openUI(UIName.StatusUI,UIType.Widget);
    }
}


