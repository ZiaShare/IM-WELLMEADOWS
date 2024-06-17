import { isValidPatientNumber } from './patient_number.js';
import { isValidAppointmentNumber } from './appointment_number.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('submitForm');
    const submitButton = document.querySelector('.buttons button');

    function displayErrorMessage(message, duration = 5000) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.margin = '10px 0';
        form.appendChild(errorMessage);
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            errorMessage.remove();
        }, duration);
    }

    function displaySuccessMessage(message, duration = 5000) {
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = message;
        successMessage.style.textAlign = 'center';
        successMessage.style.margin = '10px 0';
        form.appendChild(successMessage);
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
            successMessage.remove();
        }, duration);
    }

    function parseAdminDateTime(dateTimeString) {
        const dateTimeParts = dateTimeString.match(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
        if (!dateTimeParts) {
            return null;
        }
        const day = parseInt(dateTimeParts[1], 10);
        const month = parseInt(dateTimeParts[2], 10);
        const year = parseInt(dateTimeParts[3], 10);
        const hours = parseInt(dateTimeParts[4], 10);
        const minutes = parseInt(dateTimeParts[5], 10);
        const seconds = parseInt(dateTimeParts[6], 10);
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
    }

    async function submitForm(event) {
        event.preventDefault();
        const existingErrors = form.querySelectorAll('.error-message, .success-message');
        existingErrors.forEach(error => error.remove());

        let isValid = true;
        let allErrorMessages = '';

        const patientNumber = document.getElementById('patient-number').value.trim();
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const address = document.getElementById('address').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const sex = document.getElementById('sex').value.trim();
        let birthdate = document.getElementById('birthdate').value.trim();
        const maritalStatus = document.getElementById('marital-status').value.trim();
        let dateRegistered = document.getElementById('date-registered').value.trim();

        const appointmentNumber = document.getElementById('appointment-number').value.trim();
        const consultantName = document.getElementById('consultant-name').value.trim();
        const id = document.getElementById('id').value.trim();
        const examRoom = document.getElementById('exam-room').value.trim();
        let dateTime = document.getElementById('date-time').value.trim();

        const referralName = document.getElementById('referral-name').value.trim();
        const clinicNumber = document.getElementById('clinic-number').value.trim();
        const referralAddress = document.getElementById('referral-address').value.trim();
        const referralTelephone = document.getElementById('referral-telephone').value.trim();

        const status = document.getElementById('status').value.trim(); 

        if (!isValidPatientNumber(patientNumber)) {
            allErrorMessages += "Invalid patient number format.\n";
            isValid = false;
        }
        if (!firstName) {
            allErrorMessages += "First name is required.\n";
            isValid = false;
        }
        if (!lastName) {
            allErrorMessages += "Last name is required.\n";
            isValid = false;
        }
        if (!address) {
            allErrorMessages += "Address is required.\n";
            isValid = false;
        }

        const telephoneRegex = /^(\(\d{3}\) \d{7}|\d{10}|\d{4}-\d{3}-\d{4}|\d{5}-\d{5})$/;
        if (!telephone) {
            allErrorMessages += "Telephone is required.\n";
            isValid = false;
        } else if (!telephoneRegex.test(telephone)) {
            allErrorMessages += "Telephone must be in the format (123) 0111999, 1234567890, 0123-234-2345, or 23423-23423.\n";
            isValid = false;
        }

        if (!isValidAppointmentNumber(appointmentNumber)) {
            allErrorMessages += "Invalid appointment number format.\n";
            isValid = false;
        }

        if (!consultantName) {
            allErrorMessages += "Consultant name is required.\n";
            isValid = false;
        }

        if (!id) {
            allErrorMessages += "ID is required.\n";
            isValid = false;
        }

        if (!examRoom) {
            allErrorMessages += "Examination room is required.\n";
            isValid = false;
        }

        if (!dateTime.trim()) {
            allErrorMessages += "Date and time are required.\n";
            isValid = false;
        } else {
            const parsedDateTime = parseAdminDateTime(dateTime);
            if (!parsedDateTime) {
                allErrorMessages += "Invalid date and time format. Use DD/MM/YY HH:mm:ss.\n";
                isValid = false;
            } else {
                dateTime = parsedDateTime;
            }
        }

        if (!referralName) {
            allErrorMessages += "Referral name is required.\n";
            isValid = false;
        }
        if (!clinicNumber) {
            allErrorMessages += "Clinic number is required.\n";
            isValid = false;
        }
        if (!referralAddress) {
            allErrorMessages += "Referral address is required.\n";
            isValid = false;
        }
        if (!referralTelephone) {
            allErrorMessages += "Referral telephone is required.\n";
            isValid = false;
        } else if (!telephoneRegex.test(referralTelephone)) {
            allErrorMessages += "Referral telephone must be in the format (123) 0111999, 1234567890, 0123-234-2345, or 23423-23423.\n";
            isValid = false;
        }

        if (!status) {
            allErrorMessages += "Status is required.\n";
            isValid = false;
        } else if (status !== "InPatient" && status !== "OutPatient") {
            allErrorMessages += "Invalid status. Please enter either 'InPatient' or 'OutPatient'.\n";
            isValid = false;
        }

        if (!isValid) {
            allErrorMessages.trim().split('\n').forEach((message, index) => {
                displayErrorMessage(message);
                if (index < allErrorMessages.length - 1) {
                    displayErrorMessage("");
                }
            });
            return;
        }

        console.log('Date and Time:', dateTime);
        console.log('Patient Number: ', patientNumber);
        console.log('Appointment Number: ', appointmentNumber);

        const data = {
            patientNumber, firstName, lastName, address, telephone, sex, birthdate, maritalStatus, dateRegistered,
            appointmentNumber, consultantName, id, examRoom, dateTime, referralName, clinicNumber, referralAddress, referralTelephone,
            status // Include status in data object
        };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
            displaySuccessMessage("Registration successful!");
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof TypeError) {
                displayErrorMessage("An unexpected error occurred. Please try again later.");
            } else if (error.message === 'NetworkError') {
                displayErrorMessage("Network error. Please check your internet connection and try again.");
            } else if (error.status === 400) {
                const errorMessage = await error.response.json();
                displayErrorMessage(errorMessage.message);
            } else {
                displayErrorMessage("Registration failed. Please try again.");
            }
        }
    }
    
    submitButton.addEventListener('click', submitForm);
});
