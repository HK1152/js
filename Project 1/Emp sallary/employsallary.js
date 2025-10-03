const empname = prompt("Enter the employee's name: ");
const salary = Number(prompt(`Enter the basic salary of ${empname}:`));

let hra = salary * 0.25;
let da = salary * 0.12;
let tax = salary * 0.05;

console.log(`Employee Name: ${empname}`);
console.log(`Basic Salary: ${salary}`);
console.log(`HRA: ${hra}`);
console.log(`DA: ${da}`);
console.log(`Tax: ${tax}`);

const total = salary + hra + da - tax;
console.log(`Total Salary: ${total}`);
