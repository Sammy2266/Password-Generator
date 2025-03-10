function checkPasswordStrength(password) {
    let strength = 0;

    // Check password length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength += 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength += 1;

    // Check for numbers
    if (/[0-9]/.test(password)) strength += 1;

    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    // Determine strength level
    if (strength <= 2) return { score: strength, label: "Weak", color: "red" };
    if (strength <= 4) return { score: strength, label: "Medium", color: "orange" };
    return { score: strength, label: "Strong", color: "green" };
}

// Example usage
const passwordInput = document.getElementById("password");
const strengthIndicator = document.getElementById("password-strength");

passwordInput.addEventListener("input", () => {
    const strength = checkPasswordStrength(passwordInput.value);
    strengthIndicator.textContent = `Strength: ${strength.label}`;
    strengthIndicator.style.color = strength.color;
});
