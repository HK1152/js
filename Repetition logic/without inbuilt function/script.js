function lan() {
    const input = document.getElementById("stringInput").value;
    const resultElement = document.getElementById("result");
    let count = 0;
    while (input[count] !== undefined) {
        count++;
    }
    resultElement.innerHTML = "The length of the string is: " + count;
}