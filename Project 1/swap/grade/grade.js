let a=Number(prompt("Enter a html mark."))
console.log("html ", a);
let b=Number(prompt("Enter a css mark."))
console.log("css ", b);
let c=Number(prompt("Enter a c mark."))
console.log("c ", c);
let d=Number(prompt("Enter a cpp mark."))
console.log("cpp ", d);
let e=Number(prompt("Enter a js mark."))
console.log("js ", e);

let total=a+b+c+d+e;
console.log("total ", total);

let par=(total*100)/500;
console.log("percentage ", par,"%");

if(100>par && 90<par) console.log("A+");
else if(90>par && 80<par) console.log("A");
else if(80>par && 60<par) console.log("B");
else if(60>par && 40<par) console.log("C");
else if(40>par && 35<par) console.log("Pass");
else console.log("Fail");