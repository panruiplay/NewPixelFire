import "./SightingDevice.scss"
import Enclosure from "./Enclosure"
import Game from "../Game"
import {pointDeg} from "../../utils"

export default class SightingDevice extends Enclosure{
    className = "san1"
    offsetX = 0
    offsetY = 0

    angle = 0       // 角度

    next(){
        this.angle = pointDeg(this.x, this.y, Game.Control.mouseX, Game.Control.mouseY)
    }

    // 更新
    update(){
        this.$dom.get(0).style.cssText = `left: ${this.x}px; top: ${this.y}px; transform: translateY(-50%) rotate(${this.angle}deg)`
        return this
    }
}
