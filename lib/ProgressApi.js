import { registerProgressComponent } from "./Progress.js"

export default class ProgressAPI {
    propertiesList = new Map([
        ["value", this.updateValue],
        ["animated", this.updateAnimatedOn],
        ["hide", this.updateHideOn] 
    ])
    
    constructor(element, options = {}) {
        this.element = element
        
        this.init()

        if (this.element == undefined) console.error("custom-progress component is not found")
        else {    
            const iterator = this.propertiesList[Symbol.iterator]()
    
            for (const item of iterator) {
                let key = item[0]
                let cb = item[1]
                const value = options[key]
                if (value != undefined) {
                    cb.bind(this)(value.toString())
                }
            }
        }


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