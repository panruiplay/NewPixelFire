import Game from "./Game"

class UI {
    $allPanel = $(".panel")     // 所有的面板
    initPanel = "loading"       // 初始面板
    current = null              // 当前显示的面板
    transitionTime = 700        // 面板过度时间

    constructor() {
        this.$allPanel.hide()
        this.current = this.$allPanel.filter(`.${this.initPanel}`)

        // 显示当前面板
        this.current.show()

        // 注册所有Btn点击音效(所有有btn样式的元素点击时，产生音效)
        $(Game.domRoot).on("click", ".btn", () => {
            // Rio TODO 放到music里面
            console.log("点击音效")
        })
    }

    // 隐藏当前面板
    hide = async () => {
        return new Promise(resolve => this.current.fadeOut(this.transitionTime, resolve))
    }
    // 显示面板
    show = async (name) => {
        this.current = this.$allPanel.filter(`.${name}`)
        return new Promise(resolve => this.current.fadeIn(this.transitionTime, resolve))
    }
    // 切换面板
    change = async (name) => {
        await this.hide()
        await this.show(name)
    }
}

export default UI
