import "./style/lib/animate.min.css"
import "./style/index.scss"

import Game from "./script/module/Game"

Game.init()

if(process.env.BUILD_ENV === "dev") {
    window.game = Game
}
