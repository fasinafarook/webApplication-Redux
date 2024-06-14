const signUpValidate = (name, email, password, confirmPassword) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Invalid email address";
  }

  if (!password.trim()) {
    return "Password is required";
  }

  if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
    return "Password is not valid, Need a strong password (at least 6 characters with letters and numbers)";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

 

  return null;
};

export default signUpValidate;

  