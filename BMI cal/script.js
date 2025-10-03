let weight = document.getElementById('weight');
let height = document.getElementById('height');
let gender = document.getElementById('gender');
let result = document.getElementById('result');
let body = document.body;
let box = document.querySelector('.box');
let weightValue = document.getElementById('weight-value');
let heightValue = document.getElementById('height-value');

function calculate(){

    let bmi = (weight.value / (height.value * height.value))*10000;
    if(bmi < 18.5){
        result.innerHTML = 'Underweight : '+ bmi.toFixed(2);
        body.style.backgroundColor = '#0b245c';
        body.style.color = 'white';
        box.style.backgroundColor = '#0f3282';
        box.style.color = '#3b5b8a';
        result.style.color = '#3b5b8a';
    }else if(bmi >= 18.5 && bmi <= 24.9){
        result.innerHTML = 'Normal weight : '+ bmi.toFixed(2);
        body.style.backgroundColor = '#45b65a';
        box.style.backgroundColor = '#53dc6c';
    }else if(bmi >= 25 && bmi <= 29.9){
        result.innerHTML = 'Overweight : '+ bmi.toFixed(2);
        body.style.backgroundColor = '#f2eb43';
        box.style.backgroundColor = '#faff46';
    }else if(bmi >= 30){
        result.innerHTML = 'Obesity : '+ bmi.toFixed(2);
        body.style.backgroundColor = '#ee3638';
        box.style.backgroundColor = '#ff3939';
    }
    weightValue.innerHTML = weight.value + ' KG';
    heightValue.innerHTML = height.value + ' CM';
}

