class UI {
    $allPanel = $(".panel")     // 所有的面板
    initPanel = "loading"       // 初始面板
    current = null              // 当前显示的面板
    transitionTime = 500        // 面板过度时间

    constructor() {
        this.$allPanel.hide()
        this.current = this.$allPanel.filter(`.${this.initPanel}`)
        this.current.show()
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
