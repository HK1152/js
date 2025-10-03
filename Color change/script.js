

let button = document.querySelector('button')
// let colors = [red,green,yellow,black,grey,pink,blue,sky]
const colors = ["red", "blue", "green", "pink", "white", "purple", "grey", "orange", "yellow"]

let div = document.querySelector('div')


button.addEventListener('click', () => {
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
})