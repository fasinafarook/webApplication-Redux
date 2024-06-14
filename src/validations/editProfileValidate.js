const editProfileValidate = (name, currentPassword, password, confirmPassword) => {
    if (!name.trim()) {
      return "Name is required";
    }
  
    if (!currentPassword.trim()) {
      return "Current password is required";
    }
  
    // Check if at least one of password or confirmPassword is not empty
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
  
  export default editProfileValidate;