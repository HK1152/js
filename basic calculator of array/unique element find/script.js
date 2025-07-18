let ave = [11,52,44,45,25,55,93,13,75,29];
let inputs = document.querySelector("#input");
let result = document.querySelector("#result");

function find() {
    let input = Number(inputs.value);
    if (ave.includes(input)) {
        result.innerHTML = "Number is available (not unique)";
    } else {
        result.innerHTML = "Number is not available (unique)";
    }
}