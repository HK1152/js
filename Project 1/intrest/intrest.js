
        let principal = Number(prompt("Enter the principal amount: "));
        let rate = Number(prompt("Enter the rate of interest: "));
        let time = Number(prompt("Enter the time in years: "));

        console.log(`Principal Amount: ${principal}`);
        console.log(`Rate of Interest: ${rate}`);
        console.log(`Time in Years: ${time}`);

        let simpleInterest = (principal * rate * time) / 100;
        console.log(`Simple Interest: ${simpleInterest}`);
        alert(`Simple Interest: ${simpleInterest}`);