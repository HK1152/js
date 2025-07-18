let input = document.querySelector("#input");
function submit(){
    let inputValue = input.value;
    let output = document.querySelector("#output");
    if(inputValue.length > 0){
        let converted = "";
        for(let i = 0; i < inputValue.length; i++){
            let char = inputValue[i];
            if(char >= 'a' && char <= 'z'){
                converted += char.toUpperCase();
            } else if(char >= 'A' && char <= 'Z'){
                converted += char.toLowerCase();
            } else {
                converted += char; // space ke liye
            }
        }
        output.innerHTML = converted;
    }
    else{
        output.innerHTML = "please enter a valid input";
    }
}