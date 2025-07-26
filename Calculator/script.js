let display = document.getElementById("display");
function displayValue(value) {
    if(value == "%"){
      let a = display.value;
      let b = `${a} / 100`;
      display.value = b;
    }
    else
    display.value = display.value + value;

}

function ans() {
    display.value = eval(display.value);
}

function clearDisplay() {
    display.value = "";
}

function del() {
    display.value = display.value.slice(0, -1);
}

function square() {
    if (display.value !== "") {
        let match = display.value.match(/(\d+\.?\d*)$/);
        if (match) {
            let num = match[1];
            let squared = Math.pow(Number(num), 2);
            display.value = display.value.replace(/(\d+\.?\d*)$/, squared);
        } else {
            display.value = "Error";
        }
    }
}

function power() {
    if (display.value !== "") {
        display.value += "**";
    }
}

function inverse() {
    if (display.value !== "") {
        let match = display.value.match(/(\d+\.?\d*)$/);
        if (match && Number(match[1]) !== 0) {
            let num = match[1];
            let inv = 1 / Number(num);
            display.value = display.value.replace(/(\d+\.?\d*)$/, inv);
        } else {
            display.value = "Error";
        }
    }
}