import {createId} from "../../utils"

export default class Enclosure {
    $dom        // jquery对象
    className   // 样式对象
    block       // 目标block
    offsetX     // 偏移x
    offsetY     // 偏移y

    constructor(block) {
        this.id = createId()
        this.block = block
        this.$dom = $("<div>")
    }

    init() {
        this.$dom.addClass(this.className)
        return this
    }

    // 出生
    async birth() {
        this.block.scene.$dom.append(this.$dom)
        return this.update()
    }

    // 下一帧
    next(){

    }
    // 更新
    update(){
        this.$dom.get(0).style.cssText = `left: ${this.x}px; top: ${this.y}px;`
        return this
    }

    get x() { return this.block.centerX + this.offsetX }
    get y() { return this.block.centerY + this.offsetY }
}
