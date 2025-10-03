let totalbill = 0;
let order = ""; 
while (true) { 
    alert("1. Jalebi  50rs \n2. Fafda   60rs \n3. Gathiya  70rs");
    
    let n = Number(prompt("Enter a number :"));
    let q = Number(prompt("Enter a quantity:"));
    let bill = 0;

    switch (n) {
        case 1:
         
            bill = 50 * q;
            order += `Jalebi (x${q}): ${bill}rs<br>`;
            break;
        case 2:
            
            bill = 60 * q;
            order += `Fafda(x${q}): ${bill}rs<br>`;
            break;
        case 3:
          
            bill = 70 * q;
            order += `Gathiya (x${q}): ${bill}rs<br>`;
            break;
        default:
            alert("Please try again.");
            continue;
    }

    totalbill += bill;

    document.getElementById("demo").innerHTML = order;

    let a = prompt("Do you want to order more? (Y/N)");

    if (a && a.toUpperCase() === "N") { 
        document.getElementById("demo").innerHTML += `<br><br><b>Your Final Total Bill is: ${totalbill}rs</b>`;
        break; 
    }
}