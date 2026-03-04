
export class ProjectSettings {
    FPS = 60

    WIDTH_RECT = 100
    HEIGHT_RECT = 100

    CANVAS_WIDTH = 150
    CANVAS_HEIGHT = 150

    POS_X_BACKGROUND = 75
    POS_Y_BACKGROUND = 25


    COLOR_BACKGROUND = "#EAF0F7"
    COLOR_PROGRESS = "#015DFF"

    PROGRESS_LINE_WIDTH = 10

    PROGRESS_STEP = 0.02

    constructor() {}

    get POS_X_LINE() {
        return this.POS_X_BACKGROUND + 50
    }

    get POS_Y_LINE() {
        return this.POS_Y_BACKGROUND + 50
    }

    get RADIUS() {
        return this.WIDTH_RECT * Math.sqrt(2) / 2
    }

    get LENGTH_ROUND_RECT() {
        return this.RADIUS * 2 * Math.PI
    }
}