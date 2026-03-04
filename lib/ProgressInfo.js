
export class ProgressInfo {
    #normal = 0
    #animated = 0
    #isAnimatedOn = true
    #isHide = false

    constructor(normal = 0) {
        this.#normal = normal
    }

    get value() {
        return this.#normal
    }

    set value(value) {
        const numValue = parseInt(value)
        if (Number.isNaN(numValue)) {
            this.#normal = 0
            this.#animated = 0
            
            console.error("Not Correct Input Type for attribute: value.")
        } else if (numValue >= 100) {
            this.#normal = 100
        } else if (numValue <= 0) {
            this.#normal = 0
        } else {
            this.#normal = numValue
        }

        this.#animated = (2 / 100) * this.#normal
    }

    get animated() {
        return this.#animated
    }

    set animated(value) {
        this.#animated = value
    }

    get isAnimatedOn() {
        return this.#isAnimatedOn
    }

    set isAnimatedOn(value) {
        this.#isAnimatedOn = value
    }

    get isHideOn() {
        return this.#isHide
    }

    set isHideOn(value) {
        this.#isHide = value
    }

}