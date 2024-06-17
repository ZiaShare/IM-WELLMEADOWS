
export function isValidPatientNumber(patientNumber) {
    const regex = /^P\d+$/;
    return regex.test(patientNumber);
  }
  