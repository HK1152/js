let input = document.getElementById("input");
let array = [];
function add(){
    array.push(input.value);
    input.value = "";
}
function display(){
    document.getElementById("display").innerHTML = array;
}