export const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid. Please check your input.";
    case "auth/user-disabled":
      return "This user account has been disabled. Please contact support.";
    case "auth/user-not-found":
      return "No user found with this email. Please check your email address.";
    case "auth/invalid-credential":
      return "No user found with this email. Please check your email address.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already in use. Please use a different email or sign in.";
    case "auth/weak-password":
      return "The password is too weak. Please use a stronger password.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Firebase Authentication. Contact the administrator.";
    case "auth/network-request-failed":
      return "A network error occurred. Please check your internet connection.";
    case "auth/too-many-requests":
      return "Too many unsuccessful login attempts. Please try again later.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    default:
      return "An unknown error occurred. Please try again.";
  }
};

// utils.js
export function validateSignupOrLoginData(actionData, isSignup = false) {
  if (!actionData) {
    return { valid: false, errors: { general: "No data provided." } };
  }

  const { displayName, email, password, confirmPassword } = actionData;
  const errors = {};

  // Signup-specific validation
  if (isSignup) {
    if (!displayName || displayName.trim().length < 3) {
      errors.displayName = "Display name must be at least 3 characters long.";
    }

    if (!confirmPassword || password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Invalid email address.";
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (Object.keys(errors).length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}
