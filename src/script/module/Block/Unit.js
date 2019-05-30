import Block from "./Block"
import {ShrinkGreedM} from "../Animation/Shrink"
import {SpreadGreen} from "../Animation/Spread"
import {BoundsLimit} from "./decorators"

@BoundsLimit
export class User extends Block {
    preAni = ShrinkGreedM
    birthAni = SpreadGreen
    className = "background-green"
    speed = 2.6
    hp = 10
    width = 10
    height = 10
}
