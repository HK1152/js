let dipositForm = document.querySelector(".diposit-form");
let withdrowForm = document.querySelector(".withdrow-form");

// Page load hote hi, deposit form dikhna chahiye aur withdraw form chup jana chahiye
dipositForm.style.display = "block";
withdrowForm.style.display = "none";

// Yeh function deposit form dikhayega aur doosre ko chhupa dega
function depositMain() {
    dipositForm.style.display = "block";
    withdrowForm.style.display = "none";
}

// Yeh function withdraw form dikhayega aur doosre ko chhupa dega
function withdrowMain() {
    dipositForm.style.display = "none";
    withdrowForm.style.display = "block";
}

// let historyContainer = document.querySelector(".right");

// Bank Account class
class bankAccount {
    constructor(acHolderName, balance) {
        this.acHolderName = acHolderName;
        this.balance = balance;
        this.history = [];
    }
    
    deposite(amt) {
        this.balance += amt;
        this.history.unshift({ type: "Deposit", amount: amt, date: new Date().toLocaleDateString() });
        return this.balance;
    }
    
    withdraw(amt) {
        this.balance -= amt;
        this.history.unshift({ type: "Withdraw", amount: amt, date: new Date().toLocaleDateString() });
        return this.balance;
    }
}

let kavya = new bankAccount("kavya", 1152); // is me obj create kiya

const updateBalanceDisplay = () => { // is me function create kiya.value display karne ke liye lagaya hai.
    document.querySelector('.bank-balance').innerHTML = `<sup>₹</sup>${kavya.balance}`;


    const scrollContainer = document.querySelector('.history-scroll-container');
    scrollContainer.innerHTML = '';// is me scroll container ko clear kiya.

    // Add new history items
    kavya.history.forEach(x => {
        const historyItem = document.createElement("div"); // creater div
        historyItem.classList.add("history-item");// us div me class add 
        
        // color add karne ke liye
        if (x.type === "Deposit") {
            historyItem.classList.add("deposit-item");
        } else {
            historyItem.classList.add("withdraw-item");
        }
        
        //  plus/minus sign or color styling ke liye
        const sign = x.type === "Deposit" ? "+" : "-";  
        const colorClass = x.type === "Deposit" ? "green-amount" : "red-amount";
        
        
        historyItem.innerHTML = `
            <h3>${x.type}</h3>
            <p class="${colorClass}">${sign}₹${x.amount}</p>
            <small>${x.date}</small>`
        ;
        scrollContainer.appendChild(historyItem);
    });
}

function deposit() {
    const amt = Number(document.getElementById('diposit-amount').value); // is me value le liya. or is me numberis liye lagaya hai kyuki value pluse ho.
    const msg = document.querySelector('.diposit-done'); // is me msg le liya.ki successfull ho ya nahi.
    if (amt > 0) { // is me amt ko check kiya. ki 0 se bada he ya nahi.
        kavya.deposite(amt); // is me deposite function ko call kiya.
        updateBalanceDisplay(); // is me updateBalanceDisplay function ko call kiya. kyuki value change ho raha he.vo dikhan padega na 
        msg.textContent = "Deposit successful!";
        document.getElementById('diposit-amount').value = '';// jo input box hai. us me submite ke bad value ko null karne ke liye lagaya hai.
    } else {
        msg.textContent = "Enter a valid amount.";
    }
}
function withdrow() {
    const amt = Number(document.getElementById('withdrow-amount').value);
    const msg = document.querySelector('.withdrow-done');
    if (amt > kavya.balance) {
        msg.textContent = "Insufficient balance!";
    } else if (amt > 0) {
        kavya.withdraw(amt);
        updateBalanceDisplay();
        msg.textContent = "Withdraw successful!";
        document.getElementById('withdrow-amount').value = ''; // Clear input field
    } else {
        msg.textContent = "Enter a valid amount.";
    }
}


