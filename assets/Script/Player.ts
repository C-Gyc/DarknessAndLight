import { _decorator, Camera, Component, director, EventTouch, find, geometry, Node, NodeEventType, PhysicsSystem } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    start() {
        find('Canvas').on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
    }
    onTouchEnd(e: EventTouch) {
        const touchPos = e.getLocation();
        let ray = new geometry.Ray();
        director.getScene().getComponentInChildren(Camera).screenPointToRay(touchPos.x, touchPos.y, ray);
        if (PhysicsSystem.instance.raycast(ray)) {
            const results = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < results.length; i++) {
                const item = results[i];
                if (item.collider.node.name === 'Map') {
                    this.node.setWorldPosition(item.hitPoint);
                    break;
                }

            }
        }
        else {
            console.log('没有碰撞到任何物体');
        }

    }
    update(deltaTime: number) {

    }
}


