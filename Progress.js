
class Progress extends HTMLElement {
    #normal = 0
    #animated = 0

    CANVAS_WIDTH = 300
    CANVAS_HEIGHT = 300

    WIDTH_RECT = 100
    HEIGHT_RECT = 100

    FPS = 60

    POS_X = 50
    POS_Y = 50

    RADIUS = this.WIDTH_RECT * Math.sqrt(2) / 2
    LENGTH_ROUND_RECT = this.RADIUS * 2 * Math.PI

    COLOR_BACKGROUND = "#EAF0F7"
    COLOR_PROGRESS = "#015DFF"

    PROGRESS_LINE_WIDTH = 10

    PROGRESS_STEP = 0.01

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })

        // this.normal = normal
        // this.animated = animated
        // this.hidden = hidden
    }   

    static observedAttributes = ["value", "animated"];

    get value() {
        return this.getAttribute("value")
    }

    set value(value) {
        const newValue = parseInt(value)
        if (typeof newValue != "number" && !Number.isNaN(newValue)) {
            this.#normal = 0
            throw new Error("Not Correct Input Type for animated attribute!")
        } else if (newValue > 100) {
            this.#normal = 100
        } else if (newValue < 0) {
            this.#normal = 0
        } else {
            this.#normal = value
        }
    }

    // get animated() {
    //     return this.getAttribute("animated")
    // }

    // set animated(value) {
    //     if (typeof value != "number" && !Number.isNaN(value)) {
    //         this.#animated = 0
    //         throw new Error("Not Correct Input Type for animated attribute!")
    //     }

    //     this.#animated = value
    // }

    connectedCallback() {
        this.render()

        this.configurateCanvas()
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render()

        this.updateAttribute(name, newVal)
        console.log(name, oldVal, newVal)
    }

    disconnectedCallback() {
        clearInterval(this.interval)
    }

    render() {
        this.shadow.innerHTML = `<canvas id="progress"></canvas>`
    }

    updateAttribute(name, newValue) {
        switch (name) {
            case "value": this.value = newValue; break;
            case "animated": this.animated = newValue; break;
            default: break;
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
        
        this.ctx.roundRect(this.POS_X, this.POS_Y, this.WIDTH_RECT, this.HEIGHT_RECT, 50)
        
        this.ctx.stroke()
    }

    animateLoad() {
        this.interval = setInterval(this.drawScroll.bind(this), 1000 / this.FPS);
    }

    drawScroll() {
        if (this.#animated >= 2) {
            this.clearProgressInfo()
            this.enableBackground()
        }

        // ______

        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.lineWidth = this.PROGRESS_LINE_WIDTH
        this.ctx.strokeStyle = this.COLOR_PROGRESS
        
        const PREV_STEP = this.#animated * Math.PI
        const NEXT_STEP = (this.#animated + this.PROGRESS_STEP) * Math.PI

        // this.ctx.arc(100,100, 50, 0.1 * Math.PI, 0.2 * Math.PI, false)
        this.ctx.arc(this.POS_X * 2, this.POS_Y * 2, 50, PREV_STEP, NEXT_STEP, false)
        this.ctx.stroke()

        this.#animated += this.PROGRESS_STEP
        // requestAnimationFrame(this.drawScroll().bind(this))
    }

    clearProgressInfo() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.LENGTH_ROUND_RECT, this.LENGTH_ROUND_RECT);
        this.ctx.closePath();
        
        this.#animated = 0
    }
}  


// export const registerProgressComponent = () => {
//     customElements.define("custom-progress", Progress)
// }
customElements.define("custom-progress", Progress)
