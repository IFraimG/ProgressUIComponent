import { ProgressInfo } from './ProgressInfo.js'
import { ProjectSettings } from './ProgressSettings.js'

export class ProgressHandler {
    #interval = null
    
    progressInfo = null
    settings = null

    constructor(canvas) {
        this.canvas = canvas

        this.progressInfo = new ProgressInfo()
        this.settings = new ProjectSettings()

        this.configurateCanvas()
    }

    configurateCanvas() {
        this.canvas.width = this.settings.CANVAS_WIDTH
        this.canvas.height = this.settings.CANVAS_HEIGHT

        this.ctx = this.canvas.getContext("2d")

        this.ctx.translate(0, 200)
        this.ctx.rotate(-90 * Math.PI / 180)

        this.enableBackground()

        this.animateStart()
    }

    updateValue(newValue) {
        this.clearAnimation()

        if (this.ctx != null) {
            this.clearProgressLine()
            this.enableBackground()
        }

        this.progressInfo.value = newValue

        if (this.ctx != null) {
            this.animateStart()
        }
    }

    updateAnimatedOn(newValue) {
        if (newValue == "true") {
            if (!this.progressInfo.isAnimatedOn && this.ctx != null) {
                this.progressInfo.isAnimatedOn = true
                this.animateStart()
            }
        } else if (newValue == "false") {
            this.clearAnimation()
            
            this.progressInfo.isAnimatedOn = false   

        } else {
            console.error("Not correct value for attribute of animated! Only available true/false")
        }
    }

    updateHideOn(newValue) {
        if (newValue == "true") {
            this.progressInfo.isHideOn = true
            this.clearAnimation()
            
            if (this.canvas != null) {
                this.canvas.style.display = "none"
            }
        } else if (newValue == "false") {
            this.progressInfo.isHideOn = false

            if (this.canvas != null) {
                this.canvas.style.display = "block"

                this.animateStart()
            }
        } else {
            console.error("Not correct value for attribute of hide! Only available true/false")
        }
    }

    
    enableBackground() {
        this.ctx.beginPath()
    
        this.ctx.lineWidth = this.settings.PROGRESS_LINE_WIDTH
        this.ctx.strokeStyle = this.settings.COLOR_BACKGROUND
        
        this.ctx.roundRect(this.settings.POS_X_BACKGROUND, this.settings.POS_Y_BACKGROUND, this.settings.WIDTH_RECT, this.settings.HEIGHT_RECT, 50)
        
        this.ctx.stroke()
    }

    animateStart() {
        if (this.progressInfo.animated > 0) this.drawRoundLine(0)

        if (this.progressInfo.isAnimatedOn) {
            this.#interval = requestAnimationFrame(this.animateLoad.bind(this))
        } 
    }

    animateLoad() {
        if (!this.progressInfo.isAnimatedOn) return
        this.drawMove()
        this.#interval = requestAnimationFrame(this.animateLoad.bind(this))
    }

    drawMove() {
        if (this.progressInfo.animated >= 2) {
            this.restartMove()
        }

        const START_STEP = this.progressInfo.animated * Math.PI
        this.drawRoundLine(START_STEP)

        this.progressInfo.animated += this.settings.PROGRESS_STEP
    }

    restartMove() {
        this.clearProgressLine()
        this.progressInfo.animated = 0
        this.enableBackground()
    }

    drawRoundLine(START_STEP) {
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.lineWidth = this.settings.PROGRESS_LINE_WIDTH
        this.ctx.strokeStyle = this.settings.COLOR_PROGRESS
        
        const NEXT_STEP = (this.progressInfo.animated + this.settings.PROGRESS_STEP) * Math.PI

        this.ctx.arc(this.settings.POS_X_LINE, this.settings.POS_Y_LINE, 50, START_STEP, NEXT_STEP, false)
        this.ctx.stroke()
    }

    clearAnimation() {
        if (this.#interval != null) {
            cancelAnimationFrame(this.#interval)
            this.#interval = null
        }
    }

    clearProgressLine() {
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.settings.LENGTH_ROUND_RECT, this.settings.LENGTH_ROUND_RECT);
        this.ctx.closePath();
    }

    clearFullData() {
        this.clearAnimation()

        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.settings.CANVAS_WIDTH, this.settings.CANVAS_HEIGHT);
        this.ctx.closePath();
        
        this.ctx = null
        this.canvas = null
        this.progressInfo = null
    }
} 