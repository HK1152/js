let totalbill = 0;
let order = "";
while (true) {
    alert("1. Jalebi  50rs \n2. Fafda   60rs \n3. Gathiya  70rs \n4. Dhokada  52rs \n5. Dhebra   11rs \n6. Handvo  23rs");

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
        case 4:

            bill = 52 * q;
            order += `Dhokada (x${q}): ${bill}rs<br>`;
            break;
        case 5:

            bill = 11 * q;
            order += `Dhebra (x${q}): ${bill}rs<br>`;
            break;
        case 6:

            bill = 23 * q;
            order += `Handvo (x${q}): ${bill}rs<br>`;
            break;
        default:
            alert("Please try again.");
            continue;
    }

    totalbill += bill;

    document.getElementById("demo").innerHTML = order;

    let a = prompt("your current bill is: " + totalbill + "rs\nDo you want to order more? (Y/N)");

    if (a && a.toUpperCase() === "N") {
        document.getElementById("demo").innerHTML += `<br><br><b>Your Final Total Bill is: ${totalbill}rs</b>`;
        break;
    }
}