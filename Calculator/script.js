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