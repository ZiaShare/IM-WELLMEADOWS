// appointment_number.js

export function isValidAppointmentNumber(appointmentNumber) {
    // Adjusted regex to allow formats like A1000, A23000, A300000, etc.
    const regex = /^A\d+$/;
    return regex.test(appointmentNumber);
  }
  