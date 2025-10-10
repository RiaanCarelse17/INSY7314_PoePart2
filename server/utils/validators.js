// utils/validators.js (backend)

export const patterns= {
  fullName: /^[A-Za-z\s]{2,50}$/, // Letters and spaces only, 2–50 chars
  idNumber: /^\d{13}$/,           // South African ID: exactly 13 digits
  username: /^[a-zA-Z0-9_]{4,20}$/, // Alphanumeric + underscore, 4–20 chars
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, // Min 8 chars, letters + numbers
  accountNumber: /^\d{10,12}$/    // Numeric, 10–12 digits
};

export const signInPatterns = {
  username: /^[a-zA-Z0-9_]{4,20}$/, // Alphanumeric + underscore, 4–20 chars
  password: /^.{8,}$/               // At least 8 characters (basic check)
};