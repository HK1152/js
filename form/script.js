const form = document.getElementById("myForm");

const showError = (id, message) => {
  document.getElementById(id).textContent = message;
};

const clearErrors = () => {
  const errors = document.querySelectorAll(".error");
  errors.forEach(e => e.textContent = "");
};

document.getElementById("range").addEventListener("input", function () {
  document.getElementById("rangeValue").textContent = this.value;
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  let isValid = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const hobbies = document.querySelectorAll('input[name="hobby"]:checked');
  const country = document.getElementById("country").value;
  const message = document.getElementById("message").value.trim();
  const file = document.getElementById("file").files[0];
  const age = parseInt(document.getElementById("age").value);
  const birthdate = document.getElementById("birthdate").value;
  const website = document.getElementById("website").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (name === "") {
    showError("nameError", "Name is required");
    isValid = false;
  }

  // if (!email.match(/^\S+@\S+\.\S+$/)) {
  //   showError("emailError", "Invalid email");
  //   isValid = false;
  // }

  if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters");
    isValid = false;
  }

  if (!gender) {
    showError("genderError", "Select your gender");
    isValid = false;
  }

  if (hobbies.length === 0) {
    showError("hobbyError", "Choose at least one hobby");
    isValid = false;
  }

  if (country === "") {
    showError("countryError", "Please select your country");
    isValid = false;
  }

  if (message.length < 10) {
    showError("messageError", "Message must be at least 10 characters");
    isValid = false;
  }

  if (!file) {
    showError("fileError", "Upload a file");
    isValid = false;
  }

  if (isNaN(age) || age < 18 || age > 60) {
    showError("ageError", "Age must be between 18 and 60");
    isValid = false;
  }

  if (!birthdate) {
    showError("birthError", "Select your birthdate");
    isValid = false;
  }

  if (!website.match(/^https?:\/\/.+/)) {
    showError("websiteError", "Enter a valid URL (http/https)");
    isValid = false;
  }

  if (!phone.match(/^[0-9]{10}$/)) {
    showError("phoneError", "Phone must be 10 digits");
    isValid = false;
  }

  if (isValid == true) {
    alert("Form submitted successfully!");
    form.reset();
    document.getElementById("rangeValue").textContent = 5;
  }
});