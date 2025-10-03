

let c = Number(prompt("Enter your c marks: "));
console.log(`c Marks: ${c}`);


let cpp = Number(prompt("Enter your cpp marks: "));
console.log(`cpp Marks: ${cpp}`);


let js = Number(prompt("Enter your js marks: "));
console.log(`js Marks: ${js}`);


let html = Number(prompt("Enter your html marks: "));
console.log(`html Marks: ${html}`);


let dsa = Number(prompt("Enter your dsa marks: "));
console.log(`dsa Marks: ${dsa}`);


let total = c + cpp + js + html + dsa;
let percentage = (total / 500) * 100;

console.log(`Total Marks: ${total}`);
console.log(`Percentage: ${percentage}%`);
if (percentage >= 90 ) {
    console.log("Grade: A+");
}
else if (percentage >= 80) {
    console.log("Grade: A");
} else if (percentage >= 70) {
    console.log("Grade: B+");
} else if (percentage >= 60) {
    console.log("Grade: B");
} else if (percentage >= 50) {
    console.log("Grade: C");
} else if (percentage >= 40) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}
