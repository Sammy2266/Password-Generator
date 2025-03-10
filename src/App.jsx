import { useState, useEffect } from "react";
import PasswordStrengthChecker from "./PasswordStrengthChecker";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const generatePassword = (length) => {
    if (length < 6) {
      alert("Password length should be at least 6 characters.");
      return;
    }

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_<|+>/";
    const allChars = lower + upper + numbers + symbols;

    let password = [
      lower[Math.floor(Math.random() * lower.length)],
      upper[Math.floor(Math.random() * upper.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    for (let i = 4; i < length; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    password = password.sort(() => Math.random() - 0.5);
    setPassword(password.join(""));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Theme Toggle Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center">Password Generator</h1>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <button
          onClick={() => generatePassword(length)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Generated Password:
            </label>
            <div className="flex">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full p-2 border rounded-l bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="bg-gray-200 dark:bg-gray-600 px-4 rounded-r hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Copy
              </button>
            </div>
            <PasswordStrengthChecker password={password} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
