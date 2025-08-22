// src/utils/firebaseErrors.ts

export function getFirebaseAuthErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection";
    case "auth/missing-password":
      return "Password is required";

    case "auth/email-already-in-use":
      return "This email is already in use";
    case "auth/weak-password":
      return "Password is too weak (must be at least 6 characters)";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled";

    case "auth/missing-email":
      return "Email is required";
    case "auth/invalid-action-code":
      return "Invalid or expired password reset link";

    default:
      return "An unexpected error occurred. Please try again";
  }
}
