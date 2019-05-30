/**
 * 矩形对象
 */
class Rect {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {boolean} centerCreate - false=以x,y为左上角起点创建矩形；true=以x,y为中心点创建矩形
     */
    constructor(x, y, width, height, centerCreate = false) {
        if(centerCreate){
            x -= width / 2
            y -= height / 2
        }
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    get centerX(){ return this.x + this.width / 2 }
    get centerY(){ return this.y + this.height / 2 }

    /**
     * 切割矩形
     * @param {number} cX - 纵向切线 x坐标
     * @param {number} cY - 横向切线 y坐标
     * @return {Rect[]}
     */
    carve(cX, cY) {
        let result = [],
            temp   = [],
            dX     = cX - this.x,
            dY     = cY - this.y,
            carveX = dX > 0 && dX < this.width,
            carveY = dY > 0 && dY < this.height

        // 切割XY方向
        if(carveX && carveY) {
            temp = this.carve(cX, this.y)
            while(temp.length) {
                result = result.concat(temp.shift().carve(this.x, cY))
            }
            // 只切割X方向
        } else if(carveX) {
            result.push(
                new Rect(this.x, this.y, dX, this.height),
                new Rect(cX, this.y, this.width - dX, this.height)
            )
            // 只切割Y方向
        } else if(carveY) {
            result.push(
                new Rect(this.x, this.y, this.width, dY),
                new Rect(this.x, cY, this.width, this.height - dY)
            )
        }

        return result
    }
}

export default Rect
