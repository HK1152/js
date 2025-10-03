//selectors in javascript
// 5 types of selector

// 1)get element by ID

let x=document.getElementById("head")

console.log(x);

//innertext: use to change internal text
//innerHTML: use to change internal HTML
function changetext(){
    x.innerText="I'm fine"
}


let span=document.getElementById("span")

function changespan(){
    // span.innerText="Dhairya"
    span.innerHTML="<b>Dhairya</b>"
    // span.innerText="<b>Dhairya</b>"
}

// 2)getelement by classname

let div=document.getElementsByClassName("div")

console.log(div);
console.log(div.length);
let i;
function chnagearray(){
    // div[0].innerText="new BOX"
    // for(i=0;i<div.length;i++){
    //     div[i].innerText="new BOX"
    // }

    //for of
    for(t of div){
        console.log(t);
        
      t.innerText="new BOX"
    }
    //for in
}


console.log(typeof(div));

// let arr=[10,20,30,40,50]

// for(x of arr){
// console.log(x);

// }