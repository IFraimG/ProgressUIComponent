import { registerProgressComponent } from "./Progress.js"

export default class ProgressAPI {
    constructor(element) {
        this.element = element
        if (this.element == undefined) throw new Error("custom-progress component is not found")

        this.init()
    }

    init() {
        registerProgressComponent()
    }

    updateValue(value) {
        this.element.setAttribute("value", value)
    }

    updateAnimatedOn(isAnimatedOn) {
        this.element.setAttribute("animated", isAnimatedOn)
    }

    updateHideOn(isHideOn) {
        this.element.setAttribute("hide", isHideOn)
    }

    getHide() {
        return this.element.isHideOn
    }

    getAnimatedOn() {
        return this.element.isAnimatedOn
    }

    getValue() {
        return this.element.value
    }
}