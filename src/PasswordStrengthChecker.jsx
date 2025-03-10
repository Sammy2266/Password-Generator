import { useState, useEffect } from "react";

const PasswordStrengthChecker = ({ password }) => {
  const [strength, setStrength] = useState("");
  const [barWidth, setBarWidth] = useState("0%");
  const [color, setColor] = useState("bg-gray-300");

  useEffect(() => {
    if (!password) {
      setStrength("");
      setBarWidth("0%");
      setColor("bg-gray-300");
      return;
    }

    // Define password strength levels
    const strengthLevels = [
      { regex: /^.{0,5}$/, label: "Too Weak", width: "25%", color: "bg-red-500" },
      { regex: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/, label: "Weak", width: "50%", color: "bg-orange-500" },
      { regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/, label: "Medium", width: "75%", color: "bg-yellow-500" },
      { regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{10,}$/, label: "Strong", width: "100%", color: "bg-green-500" },
    ];

    // Check strength
    for (let level of strengthLevels) {
      if (level.regex.test(password)) {
        setStrength(level.label);
        setBarWidth(level.width);
        setColor(level.color);
      }
    }
  }, [password]);

  return (
    <div className="mt-4">
      <p className="font-bold text-white">Strength: {strength}</p>
      <div className="w-full h-2 bg-gray-300 rounded">
        <div className={`h-2 rounded transition-all duration-300 ${color}`} style={{ width: barWidth }}></div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
