let input = document.getElementById("input");

function pal() {
    let real = input.value; // real Value
    
    if (real === "") {
        document.getElementById("result").innerHTML = "Answer: Please enter something";
        return; 
    }
    let revers = real.split("").reverse().join(""); // reverse value

    if (real === revers) {
        document.getElementById("result").innerHTML = "Answer: It's a Palindrome!";
    } else if(real == ""){
        document.getElementById("result").innerHTML = "Answer: please enter a number";
    }else{
        document.getElementById("result").innerHTML = "Answer: Not a Palindrome";
    }
}