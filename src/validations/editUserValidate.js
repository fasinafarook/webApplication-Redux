const editUserValidate = (name, password, confirmPassword) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (password.trim() || confirmPassword.trim()) {
    if (!password.trim()) {
      return "Password is required";
    }

    const isPasswordValid = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);
    if (!isPasswordValid) {
      return "Password is not valid, Need a strong password";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
  }

  return null;
};

export default editUserValidate;
