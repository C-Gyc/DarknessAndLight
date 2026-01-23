import { _decorator, Camera, CharacterController, Component, director, EventTouch, find, geometry, Node, NodeEventType, physics, PhysicsSystem, SkeletalAnimation, TextAsset, Vec3 } from 'cc';
import { EventMgr } from '../../FrameWork/EventManager';
import { RoleProperty } from './RoleProperty';
import { IconData } from '../../FrameWork/Tools/DataClass';
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
    private _roleProperty: RoleProperty = null;
    protected onLoad(): void {
        EventMgr.Instance.on('init',this.init,this);
        this._characterCtrl = this.getComponent(CharacterController);
        this._anim = this.getComponentInChildren(SkeletalAnimation);
        this._sample = this._anim.defaultClip.sample;
        this.analyzeAnimationData();
        this._deltaPos = this.mainCamera.node.worldPosition.clone().subtract(this.node.worldPosition);
    }
    start() {
        this._anim.play('Take 001');
        this.changeAnimation('Idle');
        EventMgr.Instance.on('ray', this.onTouchEnd, this)
    }

    init() {
        this._roleProperty = {
            hp:100,
            mp:100,
            atk:100,
            def:100,
            speed:100,
            lv: -1
        }
        this.upGrade();
        EventMgr.Instance.on('changeProperty',this.changeProperty,this);
    }

    changeProperty(data :IconData,sign:number = 1){
        this.changeHp(data.hp*sign);
        this.changeMp(data.mp*sign);
        this.changeAtk(data.atk*sign);
        this.changeDef(data.def*sign);
        this.changeSpeed(data.speed*sign);
    }
    changeHp(dt:number){
        this._roleProperty.hp+=dt;
        EventMgr.Instance.emit('change','_Hp',`生命值:${this._roleProperty.hp}`)
    }
    changeMp(dt:number){
        this._roleProperty.mp+=dt;
        EventMgr.Instance.emit('change','_Mp',`魔法值:${this._roleProperty.mp}`)
    }
    changeAtk(dt:number){
        this._roleProperty.atk+=dt;
        EventMgr.Instance.emit('change','_Atk',`攻击力:${this._roleProperty.atk}`)
    }
    changeDef(dt:number){
        this._roleProperty.def+=dt;
        EventMgr.Instance.emit('change','_Def',`防御力:${this._roleProperty.def}`)
    }
    changeSpeed(dt:number){
        this._roleProperty.speed+=dt;
        EventMgr.Instance.emit('change','_Speed',`速度:${this._roleProperty.speed}`)
    }
    upGrade(){
        this._roleProperty.lv++;
        const lv= this._roleProperty.lv;
        EventMgr.Instance.emit('change','_name',`暗黑游侠:${lv}lv`);
        this.changeHp(lv*2);
        this.changeMp(lv*2);
        this.changeAtk(lv*2);
        this.changeDef(lv*2);
        this.changeSpeed(lv*2);
    }

    onTouchEnd(item: physics.PhysicsRayResult) {
        if (item.collider.node.name === 'Map') {
            const targetPos = item.hitPoint.clone();
            this._targetPos = targetPos.clone();
            targetPos.y = this.node.worldPositionY;
            this.node.lookAt(targetPos);
            this._moveDir = targetPos.subtract(this.node.worldPosition).normalize().multiplyScalar(0.06);
            this._moveDir.y = -0.01;
            this.changeAnimation('Walk');
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

    private atTarget(): boolean {
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


