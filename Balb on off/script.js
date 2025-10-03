let onBtn = document.getElementById("on");
let offBtn = document.getElementById("off");
let mainDiv = document.querySelector(".main");

onBtn.addEventListener("click", function() {
    mainDiv.classList.remove("parant");
    mainDiv.classList.add("main");
    // mainDiv.style.backgroundImage = "url(./img/on.png)";
});

offBtn.addEventListener("click", function() {
    mainDiv.classList.remove("main");
    mainDiv.classList.add("parant");
    // mainDiv.style.backgroundImage = "url(./img/off.png)";
});
