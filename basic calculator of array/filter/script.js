let input = document.getElementById("input");
let adult = [];
let child = [];
function addage(){
    let age = input.value;
    if(age >= 18){
        adult.push(age);
        document.getElementById("adult-output").innerHTML = adult;
    }else{
        child.push(age);
        document.getElementById("child-output").innerHTML = child;
    }
}