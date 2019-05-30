import "./Animation.scss"

/**
 * 动画类: new Animation().show()
 */
class Animation {
    static baseClass = "ani"

    className = ""      // 动画样式
    music = ""          // 音乐
    width = 10          // 动画dom的宽
    height = 10         // 动画dom的高

    constructor() {
        this.$dom = $("<div>").addClass(Animation.baseClass)
    }

    /**
     * 显示动画
     * @param x - 中心点
     * @param y - 中心点
     * @param scene - 目标场景
     * @return {Promise<any>}
     */
    show(x, y, scene) {
        x = x - this.width / 2
        y = y - this.height / 2

        this.$dom.addClass(this.className)
        this.$dom.get(0).style.cssText = `left: ${x}px; top: ${y}px;`

        return new Promise(resolve => {
            scene.$dom.append(this.$dom)
            this.$dom.one("animationend", () => {
                this.$dom.remove()
                resolve()
            })
        })
    }
}

export default Animation
