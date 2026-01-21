import { _decorator, Camera, CharacterController, Component, director, EventTouch, find, geometry, Node, NodeEventType, PhysicsSystem, SkeletalAnimation, TextAsset, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(TextAsset)
    animationData: TextAsset = null;
    @property(Camera)
    mainCamera: Camera = null;
    private _moveDir: Vec3 = new Vec3();
    private _aniState: Map<string, { min: number, max: number }> = new Map();
    private _sample: number = 0;
    private _curState: string = null;
    private _targetPos: Vec3 = null;
    private _characterCtrl: CharacterController
    private _anim: SkeletalAnimation = null;
    private _deltaPos: Vec3 = new Vec3();
    protected onLoad(): void {
        this._characterCtrl = this.getComponent(CharacterController);
        this._anim = this.getComponentInChildren(SkeletalAnimation);
        this._sample = this._anim.defaultClip.sample;
        this.analyzeAnimationData();
        this._deltaPos = this.mainCamera.node.worldPosition.clone().subtract(this.node.worldPosition);
    }
    start() {
        find('Canvas').on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this._anim.play('Take 001');
        this.changeAnimation('Idle');
    }
    onTouchEnd(e: EventTouch) {
        const touchPos = e.getLocation();
        let ray = new geometry.Ray();
        this.mainCamera.screenPointToRay(touchPos.x, touchPos.y, ray);
        if (PhysicsSystem.instance.raycast(ray)) {
            const results = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < results.length; i++) {
                const item = results[i];
                if (item.collider.node.name === 'Map') {
                    const targetPos = item.hitPoint.clone();
                    this._targetPos = targetPos.clone() ;
                    targetPos.y = this.node.worldPositionY;
                    
                    this.node.lookAt(targetPos);
                    this._moveDir = targetPos.subtract(this.node.worldPosition).normalize().multiplyScalar(0.06);
                    this._moveDir.y = -0.01;
                    this.changeAnimation('Walk');
                }

            }
        }
        else {
            console.log('没有碰撞到任何物体');
        }

    }


    analyzeAnimationData() {
        const data: string[] = this.animationData.text.split('\r\n');
        data.pop();
        for (const item of data) {
            let values = item.split('\t');
            values = values.filter(value => value !== '');
            let frame = values[1].split('-');
            this._aniState.set(values[0], { min: Number(frame[0]) / this._sample, max: Number(frame[1]) / this._sample });
        }
    }

    changeAnimation(state: string) {
        if (this._curState === state) {
            return;
        }
        this._curState = state;
        const aniState = this._anim.getState('Take 001');
        aniState.playbackRange = this._aniState.get(state);
    }

    private atTarget():boolean{
      return this._targetPos && this.node.worldPosition.clone().subtract(this._targetPos).length() <= 0.5;
             
    }
    update(deltaTime: number) {
        if (this._moveDir) {
            this._characterCtrl.move(this._moveDir);
            if (this.atTarget()) {
                this._moveDir = null;
                this.changeAnimation('Idle');
            }
        }

        //相机跟随
        const targetPos = this.node.worldPosition.clone().add(this._deltaPos);
        this.mainCamera.node.worldPosition = targetPos;
    }
}


