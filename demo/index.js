
import ProgressAPI from "../lib/ProgressApi.js"

const normalNumber = document.getElementById("normal")
const animateCheckbox = document.getElementById("animate")
const hideCheckbox = document.getElementById("hide")
const elementProgress = document.getElementById("c-pr")

const templateOptions = { value: 80, animated: animateCheckbox.checked, hide: hideCheckbox.checked }

const progressAPI = new ProgressAPI(elementProgress, templateOptions)

normalNumber.addEventListener("change", event => progressAPI.updateValue(event.target.value))
animateCheckbox.addEventListener("change", event => progressAPI.updateAnimatedOn(event.target.checked))
hideCheckbox.addEventListener("change", event => progressAPI.updateHideOn(event.target.checked))
