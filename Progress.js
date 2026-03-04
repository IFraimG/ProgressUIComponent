
export class Progress extends HTMLElement {
    #normal = 0
    #animated = 0
    #isAnimatedOn = true
    #isHide = false

    FPS = 60

    WIDTH_RECT = 100
    HEIGHT_RECT = 100

    CANVAS_WIDTH = 150
    CANVAS_HEIGHT = 150

    POS_X_BACKGROUND = 75
    POS_Y_BACKGROUND = 25

    POS_X_LINE = this.POS_X_BACKGROUND + 50
    POS_Y_LINE = this.POS_Y_BACKGROUND + 50

    RADIUS = this.WIDTH_RECT * Math.sqrt(2) / 2
    LENGTH_ROUND_RECT = this.RADIUS * 2 * Math.PI

    COLOR_BACKGROUND = "#EAF0F7"
    COLOR_PROGRESS = "#015DFF"

    PROGRESS_LINE_WIDTH = 10

    PROGRESS_STEP = 0.01

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }   

    static observedAttributes = ["value", "animated", "hide"];

    get value() {
        return this.#normal
    }

    set value(value) {
        const numValue = parseInt(value)
        if (Number.isNaN(numValue)) {
            this.#normal = 0
            this.#animated = 0
            throw new Error("Not Correct Input Type for attribute: value.")
        } else if (numValue > 100) {
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

    connectedCallback() {
        this.render()

        this.configurateCanvas()
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.updateAttribute(name, newVal)
    }

    disconnectedCallback() {
        this.clearFullData()
    }

    render() {
        this.shadow.innerHTML = `<canvas id="progress"></canvas>`
    }

    updateAttribute(name, newValue) {
        switch (name) {
            case "value": this.updateValue(newValue); break;
            case "animated": this.updateAnimatedOn(newValue); break;
            case "hide": this.updateHideOn(newValue); break;
            default: break;
        }
    }

    updateValue(newValue) {
        if (this.interval != null) {
            clearInterval(this.interval)
            this.interval = null
        }

        if (this.ctx != null) {
            this.clearProgressInfo()
            this.enableBackground()
        }

        this.value = newValue

        if (this.ctx != null) {
            this.animateLoad()
        }
    }

    updateAnimatedOn(newValue) {
        if (newValue == "true") {
            if (!this.#isAnimatedOn && this.ctx != null) {
                this.isAnimatedOn = true
                this.animateLoad()
            }
        } else if (newValue == "false") {
            if (this.interval != null) {
                clearInterval(this.interval)
                this.interval = null
            }
            this.isAnimatedOn = false

        } else {
            throw new Error("Not correct value for attribute of animated! Only available true/false")
        }
    }

    updateHideOn(newValue) {
        if (newValue == "true") {
            this.isHideOn = true

            if (this.interval != null) {
                clearInterval(this.interval)
                this.interval = null
            }
            
            if (this.canvas != null) {
                this.canvas.style.display = "none"
            }
        } else if (newValue == "false") {
            this.isHideOn = false

            if (this.canvas != null) {
                this.canvas.style.display = "block"
                this.animateLoad()
            }
        } else {
            throw new Error("Not correct value for attribute of hide! Only available true/false")
        }
    }

    configurateCanvas() {
        this.canvas = this.shadow.getElementById("progress")
        this.canvas.width = this.CANVAS_WIDTH
        this.canvas.height = this.CANVAS_HEIGHT

        this.ctx = this.canvas.getContext("2d")

        this.ctx.translate(0, 200)
        this.ctx.rotate(-90 * Math.PI / 180)

        this.enableBackground()

        this.animateLoad()
    }
    
    enableBackground() {
        this.ctx.beginPath()
        
        this.ctx.lineWidth = this.PROGRESS_LINE_WIDTH
        this.ctx.strokeStyle = this.COLOR_BACKGROUND
        
        this.ctx.roundRect(this.POS_X_BACKGROUND, this.POS_Y_BACKGROUND, this.WIDTH_RECT, this.HEIGHT_RECT, 50)
        
        this.ctx.stroke()
    }

    animateLoad() {
        if (this.#animated > 0) this.drawRoundLine(0)

        if (this.#isAnimatedOn) {
            this.interval = setInterval(this.drawScroll.bind(this), 1000 / this.FPS);
        } 
    }

    drawScroll() {
        if (this.#animated >= 2) {
            this.clearProgressInfo()
            this.enableBackground()
        }

        const START_STEP = this.#animated * Math.PI
        this.drawRoundLine(START_STEP)

        this.#animated += this.PROGRESS_STEP
    }

    drawRoundLine(START_STEP) {
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.lineWidth = this.PROGRESS_LINE_WIDTH
        this.ctx.strokeStyle = this.COLOR_PROGRESS
        
        const NEXT_STEP = (this.#animated + this.PROGRESS_STEP) * Math.PI

        this.ctx.arc(this.POS_X_LINE, this.POS_Y_LINE, 50, START_STEP, NEXT_STEP, false)
        this.ctx.stroke()
    }

    clearProgressInfo() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.LENGTH_ROUND_RECT, this.LENGTH_ROUND_RECT);
        this.ctx.closePath();
        
        this.#animated = 0
    }

    clearFullData() {
        if (this.interval != null) {
            clearInterval(this.interval)
            this.interval = null
        }

        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.ctx.closePath();
        
        this.ctx = null
        this.canvas = null
        this.#normal = 0
        this.#animated = 0
        this.#isAnimatedOn = true
    }
}  


export const registerProgressComponent = () => {
    customElements.define("custom-progress", Progress)
}
