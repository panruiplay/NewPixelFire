import Rect from "./Rect"

/**
 * 场景
 * 放置Block单位，处理战斗场面、碰撞
 */
class Scene extends Rect {
    /**
     * 判断两个block是否碰撞
     * @param {Block} rect1
     * @param {Block} rect2
     * @return {boolean}
     */
    static isCollision(rect1, rect2) {
        let b1x = rect1.x,
            b1y = rect1.y,
            b2x = rect2.x,
            b2y = rect2.y

        return !(
            b1y > rect2.height + b2y ||
            rect1.width + b1x < b2x ||
            rect1.height + b1y < b2y ||
            b1x > rect2.width + b2x
        )
    }

    /** @type {Block} */
    user                      // 用户单位
    /** @type {Block[]} */
    userGroup = []            // 用户组block
    /** @type {Block[]} */
    enemyGroup = []           // 敌方组block

    constructor(game) {
        let $dom = $(game.$domRoot)
        super(0, 0, $dom.width(), $dom.height())
        this.$dom = $dom
        this.Game = game
    }

    /**
     * block进入场景
     * @param {Block} block
     * @param {"userGroup"|"enemyGroup"} group
     */
    async addIntoScene(block, group) {
        await block.birth()
        this[group].push(block)
    }

    // 运行
    next() {
        const userGroup = this.userGroup

        for(let i = this.userGroup.length - 1; i >= 0; i--) {
            let block = userGroup[i]
            block.next().update()
        }
    }
}

export default Scene
