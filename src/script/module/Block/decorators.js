// import Pointer from './Pointer'
// import Game from '../Game'
//
// /* 类装饰 */
// // block的显示样式会根据自身angle属性进行旋转
// export function directionExpansion(block, angleFix = 0) {
//     let _update = block.update
//     block.update = () => {
//         block.dom.style.transform = `rotate(${block.angle + angleFix}deg)`
//         _update.call(block)
//     }
// }
//
// /* 实例装饰 */
// // block添加指针
// export function pointerExpansion(block, className) {
//     block.pointer = new Pointer(block, className)
//
//     let _init = block.init
//     block.init = () => {
//         block.pointer.init()
//         _init.call(block)
//     }
//
//     let _birth = block.birth
//     block.birth = (hasAni = true, cb) => {
//         let _cb = cb
//
//         _birth.call(block, hasAni, () => {
//             block.pointer.birth()
//             _cb && _cb()
//         })
//     }
//
//     let _update = block.update
//     block.update = () => {
//         block.pointer.update()
//         _update.call(block)
//     }
//
//     let _destroy = block.destroy
//     block.destroy = () => {
//         block.pointer.destroy()
//         _destroy.call(block)
//     }
// }

// 边界限制，block不可以超出边界
export function BoundsLimit(block) {
    let _next = block.prototype.next
    block.prototype.next = function() {
        _next.call(this)
        const {width, height} = this.scene

        if(this.x < 0) this.x = 0
        if(this.x + this.width > width) this.x = width - this.width
        if(this.y + this.height > height) this.y = height - this.height
        if(this.y < 0) this.y = 0

        return this
    }
    return block
}

// 边界反弹
export function BoundsRebound(block) {
    let _next = block.prototype.next
    block.prototype.next = function() {
        _next.call(this)
        const {width, height} = this.scene

        if(this.x < 0) this.x = 0, this.vx *= -1
        if(this.y < 0) this.y = 0, this.vy *= -1
        if(this.x + this.width > width) this.x = width - this.width, this.vx *= -1
        if(this.y + this.height > height) this.y = height - this.height, this.vy *= -1

        return this
    }
}
