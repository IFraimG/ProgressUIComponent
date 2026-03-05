import { ProgressHandler } from './ProgressHandler.js'

class Progress extends HTMLElement {
    #progressHandler = null

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }   

    static observedAttributes = ["value", "animated", "hide"];

    connectedCallback() {
        this.render()

        const canvas = this.shadow.getElementById("progress")
        this.#progressHandler = new ProgressHandler(canvas)
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
        this.#updateAttribute(name, newVal)
    }

    #updateAttribute(name, newValue) {
        if (this.#progressHandler != null) {
            switch (name) {
                case "value": this.#progressHandler.updateValue(newValue); break;
                case "animated": this.#progressHandler.updateAnimatedOn(newValue); break;
                case "hide": this.#progressHandler.updateHideOn(newValue); break;
                default: null;
            }
        }
    }

    disconnectedCallback() {
        this.#progressHandler.clearFullData()
    }

    render() {
        this.shadow.innerHTML = `<canvas id="progress"></canvas>`
    }
}  

export const registerProgressComponent = () => {
    customElements.define("custom-progress", Progress)
}
