import React, { useState } from "react";

const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    if (strength <= 2) return { label: "Weak", color: "red", width: "33%" };
    if (strength <= 4) return { label: "Medium", color: "orange", width: "66%" };
    return { label: "Strong", color: "green", width: "100%" };
};

const PasswordStrengthChecker = () => {
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState({ label: "", color: "", width: "0%" });

    const handleChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setStrength(checkPasswordStrength(newPassword));
    };

    return (
        <div className="max-w-sm mx-auto mt-5 p-4 border rounded-lg shadow-lg">
            <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter password"
                value={password}
                onChange={handleChange}
            />
            <div className="relative w-full h-2 mt-2 bg-gray-300 rounded">
                <div
                    className="h-2 rounded transition-all duration-300"
                    style={{ width: strength.width, backgroundColor: strength.color }}
                ></div>
            </div>
            <p className="mt-2 text-sm font-semibold" style={{ color: strength.color }}>
                {strength.label}
            </p>
        </div>
    );
};

export default PasswordStrengthChecker;
