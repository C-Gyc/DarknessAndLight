import { _decorator, Camera, Component, EventTouch, find, geometry, Node, NodeEventType, PhysicsSystem } from 'cc';
import { EventMgr } from '../FrameWork/EventManager';
const { ccclass, property } = _decorator;

@ccclass('TouchMgr')
export class TouchMgr extends Component {
    @property(Camera)
    mainCamera: Camera = null;
    protected start(): void {
        find('Canvas').on(NodeEventType.TOUCH_END, this.onTouch, this);
    }

    onTouch(e: EventTouch) {
        const touchPos = e.getLocation();
        let ray = new geometry.Ray();
        this.mainCamera.screenPointToRay(touchPos.x, touchPos.y, ray);
        if (PhysicsSystem.instance.raycast(ray)) {
            const results = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < results.length; i++) {
                const item = results[i];
                EventMgr.Instance.emit('ray',item)
            }
        }
        else {
            console.log('没有碰撞到任何物体');
        }
    }
}


