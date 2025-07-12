
function sort(){
    let input = document.getElementById("input").value;
    let sorted = input.split("").sort().join(" ");
    document.getElementById("output").innerHTML = sorted ;
    document.getElementById("input").value = "";
    console.log(sorted);
}
