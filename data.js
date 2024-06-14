const form = document.getElementById('signupForm');
const submitButton = document.getElementById('button-register').querySelector('button');
const errorMessage = document.getElementById("errorMessage");

function submitForm() {
errorMessage.textContent = "";

let isValid = true;

const firstName = document.getElementById('firstName').value;
if (!firstName.trim()) {
    errorMessage.textContent += "Please enter your First Name.\n";
    isValid = false;
}

const lastName = document.getElementById('lastName').value;
if (!lastName.trim()) {
    errorMessage.textContent += "Please enter your Last Name.\n";
    isValid = false;
}

const address = document.getElementById('address').value;
if (!address.trim()) {
    errorMessage.textContent += "Please enter your Address.\n";
    isValid = false;
}

const telephone = document.getElementById("telephone").value;
if (!telephone.trim()) {
    errorMessage.textContent += "Please enter your Telephone Number.\n";
    isValid = false;
} else if (!/^\d+$/.test(telephone)) { 
    errorMessage.textContent += "Please enter a valid Telephone Number (numbers only).\n";
    isValid = false;
}

const birthday = document.getElementById("birthday").value;
if (!birthday.trim()) {
    errorMessage.textContent += "Please enter your Date of Birth.\n";
    isValid = false;
}

const sex = document.getElementById("sex").value;
if (sex === "") {
    errorMessage.textContent += "Please select your Sex.\n";
     isValid = false;
}

const maritalStatus = document.getElementById("maritalStatus").value;
if (maritalStatus === "") {
    errorMessage.textContent += "Please select your Marital Status.\n";
    isValid = false;
}

const dateRegistered = document.getElementById("dateRegistered").value;
if (!dateRegistered.trim()) {
    errorMessage.textContent += "Please enter the Date Registered.\n";
    isValid = false;
}

if (isValid) {
    const data = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    telephone: telephone,
    birthday: birthday,
    sex: sex,
    maritalStatus: maritalStatus,
    dateRegistered: dateRegistered,
};

    try {
        fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`Error registering patient: ${response.statusText}`);
    }

    return response.json();
    })
    .then(responseData => {
    console.log('Patient registration successful!', responseData);
    alert('Registration successful!'); 
    submitButton.disabled = true;
    form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessage.textContent = `Error: ${error.message}`;
        submitButton.disabled = false;
    });
} catch (error) {
    console.error('Error:', error);
    errorMessage.textContent = `Error: An unexpected error occurred. Please try again later.`;
}
} else {
errorMessage.classList.add("visible");
   setTimeout(() => {
   errorMessage.classList.remove("visible");
}, 2000);
}
}

submitButton.addEventListener('click', submitForm);
