
let input = document.getElementById('input');
let checks = document.getElementById('check');
let displays = document.getElementById('display');
let unique = [];

function check() {
    let val = input.value;
    if (val === "" ) {
        checks.innerHTML = "Please enter a number";
        return;
    }
    if (unique.includes(val)) {
        checks.innerHTML = "it is not unique";
    } else {
        checks.innerHTML = "it is unique";
        unique.push(val);
    }
}

function display() {
    displays.innerHTML = "Unique values: " + unique + " ";
}
