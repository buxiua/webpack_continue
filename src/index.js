import css from "./css/index.css"
import img from "./image/gao.webp"
import {fun} from "./js/main.js"

let imageEl = new Image();
imageEl.src = img;
imageEl.style.height = "200px"
imageEl.style.width = "200px"

document.body.appendChild(imageEl)

let el = fun();
el.innerHTML="hello webpack!!!";
el.classList.add("hello")
console.log("hello world")
