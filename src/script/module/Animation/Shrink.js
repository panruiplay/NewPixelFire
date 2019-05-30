import Animation from "./Animation"

export class ShrinkRed extends Animation {
    className = "shrink shrink-red"
    width = 10
    height = 10
}

export class ShrinkGreed extends Animation {
    className = "shrink shrink-green"
    width = 10
    height = 10
}

export class ShrinkGreedM {
    show(x, y, scene) {
        let count = 0, arr = []

        return new Promise(resolve => {
            function go() {
                arr.push(new ShrinkGreed().show(x, y, scene))
                if(++count < 4) return setTimeout(go, 100)
                return Promise.all(arr).then(resolve)
            }
            go()
        })
    }
}

