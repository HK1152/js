
const invoiceBody = document.getElementById('invoice-body');
const addBtn = document.getElementById('add-row');
const subtotalAmountEl = document.getElementById('subtotal-amount');
const taxAmountEl = document.getElementById('tax-amount');
const netAmountEl = document.getElementById('net-amount');
const taxInput = document.getElementById('tax');
const calculateBtn = document.getElementById('calculate-total');
const resetBtn = document.getElementById('reset-btn');

const customerInput = document.getElementById('customer');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const invoiceNumberInput = document.getElementById('invoice-number');
const invoiceDateInput = document.getElementById('invoice-date');

// default me aek row create hoga
document.addEventListener('DOMContentLoaded', () => {
    invoiceBody.appendChild(createRow());
    updateIndexes();
});

// Add button : jo form me add btn hai uske liye
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    invoiceBody.appendChild(createRow());
    updateIndexes();
});

// Create hota hai
function createRow() {
    const tr = document.createElement('tr');
    tr.className = 'border-b hover:bg-gray-50';

    tr.innerHTML = `
        <td class="p-2 text-center index">1</td>
        <td class="p-2">
            <input type="text" class="w-full border p-1 outline-none" placeholder="Item name">
        </td>
        <td class="p-2">
            <input type="number" class="w-full border p-1 qty outline-none" min="0" value="0" step="0.01">
        </td>
        <td class="p-2">
            <input type="number" class="w-full border p-1 rate" min="0" value="0" step="0.01">
        </td>
        
        <td class="p-2 text-right amount">0.00</td>
        <td class="p-2 text-center">
            <button class="remove-row bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">x</button>
        </td>
    `;

    //input 
    const qtyInput = tr.querySelector('.qty');
    const rateInput = tr.querySelector('.rate');
    //update ontime change
    const amountCell = tr.querySelector('.amount');

    function calcAmount() {
        const qty = parseFloat(qtyInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const subtotal = qty * rate;
        amountCell.textContent = subtotal.toFixed(2);
        updateTotal();
    }

    //ontime change ke liye 
    // qtyInput.addEventListener('change', calcAmount); //qtyInput hoga tab change dikhega
    // rateInput.addEventListener('change', calcAmount);   
    qtyInput.addEventListener('input', calcAmount); //input hoga tab bhi change dikhega
    rateInput.addEventListener('input', calcAmount);

    // Remove row: jo tabal hai usme "x" pe click karne par
    tr.querySelector('.remove-row').addEventListener('click', (e) => {
        e.preventDefault();
        tr.remove();
        updateIndexes(); // jab remove karege tab bhi forEach chalega
        updateTotal(); // remove karne ke baad total bhi update hoga
    });

    return tr;
}

// index update : kuchh bhi ho but index count hogi (remove ya add)
function updateIndexes() {
    const rows = invoiceBody.querySelectorAll('tr');
    rows.forEach((row, i) => {
        row.querySelector('.index').textContent = i + 1;
    });
}

//  total, tax and net amount 
function updateTotal() {
    const rows = invoiceBody.querySelectorAll('tr');
    let subtotal = 0;

    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const rate = parseFloat(row.querySelector('.rate').value) || 0;
        const rowSubtotal = qty * rate;
        subtotal += rowSubtotal;
    });// is forEach se ontime subTotal calculate hoga

    const taxVal = parseFloat(taxInput.value);
    const tax = isNaN(taxVal) ? 25 : taxVal;
    const taxAmount = (subtotal * tax) / 100;
    const grandTotal = subtotal + taxAmount;

    subtotalAmountEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    taxAmountEl.textContent = `Tax: $${taxAmount.toFixed(2)}`;
    netAmountEl.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
}

// Tax change
taxInput.addEventListener('change', updateTotal);
taxInput.addEventListener('input', updateTotal);

// Reset functionality
resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Clear
    document.getElementById('customer').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('invoice-number').value = '';
    document.getElementById('invoice-date').value = '';
    taxInput.value = '';
    
    // Clear all rows
    invoiceBody.innerHTML = ''; // is se sab tr chale jae ge
    invoiceBody.appendChild(createRow()); // aek to rahega is se
    updateIndexes();
    updateTotal();
});



//chack karta hai ki kuchh chhut to nahi raha
calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Validate 
    const customerVal = document.getElementById('customer').value.trim();
    const rows = invoiceBody.querySelectorAll('tr');
    if (!customerVal) {
        alert('Please enter customer name');
        return;
    }
    if (rows.length === 0) {
        alert('Please add at least one item');
        return;
    }
    updateTotal();
    printInvoice();
});


// Print invoice 
function printInvoice() {
    // ye sab input ke hai
    const customerName = document.getElementById('customer').value;
    const customerAddress = document.getElementById('address').value;
    const customerCity = document.getElementById('city').value;
    const invoiceNumber = document.getElementById('invoice-number').value;
    const invoiceDate = document.getElementById('invoice-date').value;

    //ye sab print me ja rahe hai
    document.getElementById('customer-name').textContent = customerName;
    document.getElementById('customer-address').textContent = customerAddress;
    document.getElementById('customer-city').textContent = customerCity;
    document.getElementById('customer-invoice-number').textContent = invoiceNumber;
    document.getElementById('customer-invoice-date').textContent = invoiceDate;

    const invoiceBodyPrint = document.getElementById('invoice-body-print');
    invoiceBodyPrint.innerHTML = '';
    
    let subtotal = 0;
    
    const rows = invoiceBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        const item = row.querySelector('input[type="text"]').value;
        const qty = parseFloat(row.querySelector('.qty').value) || 0;
        const rate = parseFloat(row.querySelector('.rate').value) || 0;
        const rowSubtotal = qty * rate;
        const amount = rowSubtotal;
        subtotal += rowSubtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="p-2 text-center">${index + 1}</td>
            <td class="p-2">${item}</td>
            <td class="p-2">${qty}</td>
            <td class="p-2">$${rate.toFixed(2)}</td>
            <td class="p-2 text-right">$${amount.toFixed(2)}</td>
        `;
        invoiceBodyPrint.appendChild(tr);
    });

    // Calculate breakdown
    const tax = parseFloat(taxInput.value) || 25;
    const taxAmount = (subtotal * tax) / 100;
    const grandTotal = subtotal + taxAmount;

    // Update print section totals
    document.getElementById('print-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('print-tax').textContent = `$${taxAmount.toFixed(2)} (${tax}%)`;
    document.getElementById('print-grand-total').textContent = `$${grandTotal.toFixed(2)}`;
}