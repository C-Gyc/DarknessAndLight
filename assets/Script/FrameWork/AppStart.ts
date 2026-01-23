import { _decorator, Component, director, Node, UI } from 'cc';
import { ResManager } from './ResManager';
import { DataManager } from './DataMgr';
import { UIManager } from './UIManager';
import { UIName } from './Tools/UIConfig';
import { UIType } from './UIBase';
import { EventMgr } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('AppStart')
export class AppStart extends Component {
    protected async  onLoad() {
        await  ResManager.Instance.loadAll();
        await  DataManager.Instance.loadAllData("Data");
        await UIManager.Instance.openUI(UIName.MinMapUI,UIType.Widget);
        await UIManager.Instance.openUI(UIName.MainMenu,UIType.Widget);
        await UIManager.Instance.openUI(UIName.RoleUI,UIType.Widget);
        await UIManager.Instance.openUI(UIName.BagUI,UIType.Widget);
        await UIManager.Instance.openUI(UIName.EquipUI,UIType.Widget);
        await UIManager.Instance.openUI(UIName.StatusUI,UIType.Widget);
        EventMgr.Instance.emit('init');
    }
        
        
    

    
}


