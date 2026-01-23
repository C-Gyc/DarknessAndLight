import { _decorator, Component, Node } from 'cc';
import { UIBase } from '../FrameWork/UIBase';
import { ResManager } from '../FrameWork/ResManager';
import { UIName } from '../FrameWork/Tools/UIConfig';
import { createNodeWithPrefab } from '../FrameWork/Tools/Tools';
import { IconUI } from './IconUI';
import { DataManager } from '../FrameWork/DataMgr';
import { IconData } from '../FrameWork/Tools/DataClass';
import { WinUI } from './WinUI';
const { ccclass, property } = _decorator;

@ccclass('ShopUI')
export class ShopUI extends WinUI {
    onStart(...args: any[]): void {
        super.onStart();
    }
    onUse(npcId:number): void {
        super.onUse();
        const iconPrefab = ResManager.Instance.getPrefab(UIName.IconUI);
        const parentNode = this.getNode('_content');
        parentNode.removeAllChildren();
        const datas:IconData[] = DataManager.Instance.getAllDataByName('OjbectsInfoList');
    
        
        for(let i=0;i<datas.length;i++){
            const data = datas[i];
            if(data.npcid!==npcId){
                continue;
            }
            const iconNode = createNodeWithPrefab(iconPrefab!, parentNode);
            iconNode.getComponent(IconUI)?.init(data);
       }
    }
}


