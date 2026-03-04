
import ProgressAPI from "./ProgressApi.js"

const normalNumber = document.getElementById("normal")
const animateCheckbox = document.getElementById("animate")
const hideCheckbox = document.getElementById("hide")
const elementProgress = document.getElementById("c-pr")

const progressAPI = new ProgressAPI(elementProgress)

normalNumber.addEventListener("change", event => progressAPI.updateValue(event.target.value))
animateCheckbox.addEventListener("change", event => progressAPI.updateAnimatedOn(event.target.checked))
hideCheckbox.addEventListener("change", event => progressAPI.updateHideOn(event.target.checked))
