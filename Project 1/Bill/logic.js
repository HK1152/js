        let item1 = prompt("Enter the name of item 1: ");
        let price1=Number(prompt(`Enter the price of ${item1}`))// first price 
        let quantity1=NUmber(promot(`Enter the quantity of ${item1}:`)) // first quantity 
        
        let item2 = prompt("Enter the name of item 2: ");
        let price2=Number(prompt(`Enter the price of ${item2}`)) // second price
        let quantity2=NUmber(promot(`Enter the quantity of ${item2}:`))//second quantity
        
        let totalPrice1 = price1 * quantity1; 
        let totalPrice2 = price2 * quantity2;
        let totalBill = totalPrice1 + totalPrice2;


        console.log(`Item 1:${item1}, Price: ${price1}, Quantity: ${quantity1}, Total Price: ${totalPrice1}`);
        console.log(`Item 2:${item2}, Price: ${price2}, Quantity: ${quantity2}, Total Price: ${totalPrice2}`);
        console.log(`Total Bill Amount: ${totalBill}`);
        