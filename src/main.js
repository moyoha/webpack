import "../static/css/base.css"
import "../static/css/color.scss"
import "../static/css/fontsize.less"
import GitImg from '../static/img/git.jpeg'

console.log("webpack")
let person = {
  msg: {
    name: "mayoha"
  }
}

let name = person?.msg?.name
console.log(name)

let set = new Set([1,2,1])
console.log(set)