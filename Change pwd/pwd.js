let oldPassword = prompt("Enter Old password:");
let newPassword;

while (1) {
    newPassword = prompt("Enter New password:");

    if (newPassword === oldPassword) {
        console.log("New password cannot be the same as the old one. Please try again. 😒");
    } else {
        console.log("New password set successfully! 😊");
        break; 
    }
}