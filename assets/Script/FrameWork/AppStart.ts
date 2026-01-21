import { _decorator, Component, director, Node, UI } from 'cc';
import { ResManager } from './ResManager';
import { DataManager } from './DataMgr';
import { UIManager } from './UIManager';
import { UIName } from './Tools/UIConfig';
const { ccclass, property } = _decorator;

@ccclass('AppStart')
export class AppStart extends Component {
    protected async  onLoad() {
        await  ResManager.Instance.loadAll();
        await  DataManager.Instance.loadAllData("Data");
        UIManager.Instance.openUI(UIName.MinMapUI);
        UIManager.Instance.openUI(UIName.MainMenu);
        UIManager.Instance.openUI(UIName.RoleUI);
    }
        
        
    

    
}


