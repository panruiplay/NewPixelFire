import "./Block.scss"

/**
 * 方块类：场景上一个可参与碰撞的基本单位
 */
class Block {
    static baseClass = "block-base"

    className = ""      // 方块样式
    preAni = null       // 预警动画
    birthAni = null     // 出生动画
    deathAni = null     // 死亡动画

    hp = 0              // 生命
    angle = 0           // 角度
    radian = 0          // 弧度
    isBirth = false     // 是否已经进入场景
    enclosures = []     // 附件
    speed = 0           // 当前速度
    x = 0
    y = 0
    width = 0
    height = 0
    vx = 0              // x轴移动速度
    vy = 0              // y轴移动速度


    // 构造函数
    constructor(x, y, centerCreate = false, scene) {
        if(centerCreate){
            x -= this.width / 2
            y -= this.height / 2
        }
        this.x = x
        this.y = y
        this.scene = scene
        this.$dom = $("<div>").addClass(Block.baseClass)
    }
    // 初始化
    init() {
        this.$dom.addClass(this.className)
        this.$dom.get(0).style.cssText = `left: ${this.x}px; top: ${this.y}px; width: ${this.width}px; height: ${this.height}px`
        this.enclosures = this.enclosures.map(v => new v(this).init())
        this.decomposeSpeed()
        return this
    }

    /* -------------∽-★-∽--- getter ---∽-★-∽------------- */
    // 是否已经死亡
    get isDestroy() { return this.hp <= 0 }
    // 中心点x
    get centerX(){ return this.x + this.width / 2 }
    // 中心点y
    get centerY(){ return this.y + this.height / 2 }

    /* -------------∽-★-∽--- 动画 & 场景 ---∽-★-∽------------- */
    // 播放预警动画
    async playPreAni() {
        if(!this.preAni) return Promise.resolve()
        await new this.preAni().show(this.centerX, this.centerY, this.scene)
    }
    // 播放出生动画
    async playBirthAni() {
        if(!this.birthAni) return Promise.resolve()
        await new this.birthAni().show(this.centerX, this.centerY, this.scene)
    }
    // 出生
    async birth(){
        await this.playPreAni()
        this.playBirthAni()
        this.scene.$dom.append(this.$dom)
        this.enclosures.forEach(v => v.birth())
        this.isBirth = true
    }

    /* -------------∽-★-∽--- 附件 ---∽-★-∽------------- */

    // 销毁
    destroy = (hasAni = true) => {
        this.isDestroy = true
        if(hasAni && this.deathAni) this.deathAni.show(this.rect.centerX, this.rect.centerY)
        Game.domRoot.removeChild(this.dom)
        this.destroyEvt.forEach(v => v())
    }
    // 行动（下一帧）

    next() {
        // this.skill.forEach(v => v.next())
        this.x += this.vx
        this.y += this.vy
        this.enclosures.forEach(v => v.next())
        return this
    }
    // 更新显示效果
    update = () => {
        this.$dom.get(0).style.left = `${this.x}px`
        this.$dom.get(0).style.top = `${this.y}px`
        this.enclosures.forEach(v => v.update())
        return this
    }
    // 死亡事件
    onDestroy = (fn) => {
        this.destroyEvt.push(fn)
        return this
    }

    // 速度设为0
    speedClear() {
        this.vx = 0
        this.vy = 0
        return this
    }
    // 设置角度
    setAngle(deg) {
        this.angle = deg
        this.radian = deg * Math.PI / 180
        this.decomposeSpeed()
        return this
    }
    // 设置弧度
    setRadian(radian) {
        this.radian = radian
        this.decomposeSpeed()
        return this
    }
    // 速度分解
    decomposeSpeed() {
        this.vx = Math.cos(this.radian) * this.speed
        this.vy = Math.sin(this.radian) * this.speed
        return this
    }
}

export default Block
