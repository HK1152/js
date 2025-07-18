let input = document.getElementById("input");
let alphabet = document.getElementById("alphabet");
let result = document.getElementById("result");

function counts() {
    let str = input.value.toLowerCase();
    let char = alphabet.value.toLowerCase();
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            count++;
        }
    }
    result.innerHTML = count;

}