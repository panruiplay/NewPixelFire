import UI from "./UI"

class Game {
    width = 1000
    height = 600
    centerX = 500
    centerY = 300
    domRoot = $(".root")      // DOM根节点对象
    user = null               // 用户角色

    userGroup = []            // 用户组block
    enemyGroup = []           // 敌方组block

    init() {
        this.UI = new UI()
        // this.Music = new Music()
        // this.Control = new Control()

        this.UI.change("intoGame")
        // this.Music.playBgm('bgm_main')
        // this.UI.change('menu')
        // })

        // 用户单位
        // this.user = new Green(this.centerX, this.centerY).speedClear()
        // pointerExpansion(this.user, 's1')
        //
        // 注册基本按钮事件
        this.eventBase()
        // // 注册用户角色方向键控制
        // this.userControl()
    }

    // 注册基本事件
    eventBase() {
        $("#intoBtn").one("click", () => {
            this.UI.change("menu")
        })
    }
}

export default new Game()
