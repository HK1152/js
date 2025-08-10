
let timer = document.getElementById("timer");
let timeUpText = document.querySelector(".timer-container p:last-child");

let time = 10;

const timerInterval = setInterval(()=>{
    time--;
    timer.textContent = time;   
    if(time <= 0){
        timer.style.display = "none";
        timeUpText.style.display = "block";
        clearInterval(timerInterval);
    }
}, 1000);

