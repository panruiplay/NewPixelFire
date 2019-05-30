import UI from "./UI"
import Rect from "./Rect"
import Scene from "./Scene"
import {User} from "./Block/Unit"
import Control from "./Control"

class Game {
    rootRect = new Rect(0, 0, 1000, 600)
    $domRoot = $(".root")     // DOM根节点对象
    user = null               // 用户角色

    UI = new UI()
    Control = new Control(this.$domRoot)

    init() {
        this.$domRoot.width(this.rootRect.width).height(this.rootRect.height)

        // this.UI.change("into-game")

        // 注册基本按钮事件
        this.eventBase()
        this.startGame()
    }

    // 注册基本事件
    eventBase() {
        // 注册所有Btn点击音效
        this.registerBtnEvent("click", ".btn", () => console.log("点击音效"), 0)
        // 点击进入游戏按钮
        this.registerBtnEvent("click", "#into-btn", () => this.UI.change("menu"))
        // 开始游戏按钮
        this.registerBtnEvent("click", "#btn-start", () => this.startGame())
    }

    // 开始游戏
    async startGame() {
        await this.UI.hide()

        const scene = new Scene(this)
        this.user = new User(this.rootRect.centerX, this.rootRect.centerY, true, scene).init().speedClear()

        await scene.addIntoScene(this.user, "userGroup")

        // 注册键盘控制
        this.Control.onDirChange((count, dir) => {
            if(count) {
                this.user.setAngle(dir)
            } else {
                this.user.speedClear()
            }
        })
        this.Control.updateGounding()

        let loop = () => {
            scene.next()
            requestAnimationFrame(loop)
        }
        loop()
    }

    /**
     * 注册按钮事件
     * @param {string} event - 同jquery的event
     * @param {string} handle - 同jquery的handle
     * @param {function} fn - 触发函数
     * @param {number=1000} interval - 触发间隔
     */
    registerBtnEvent(event, handle, fn, interval = 1000) {
        let triggerDate = 0
        this.$domRoot.on(event, handle, () => {
            if(Date.now() - triggerDate < interval) return
            triggerDate = Date.now()
            fn()
        })
    }
}

export default new Game()
