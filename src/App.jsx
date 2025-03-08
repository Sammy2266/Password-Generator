import { useState } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);

  const generatePassword = (length) => {
    if (length < 6) {
      alert("Password length should be at least 6 characters.");
      return;
    }
    
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_<|+>/';
    const allChars = lower + upper + numbers + symbols;

    // Ensure at least one character from each category
    let password = [
      lower[Math.floor(Math.random() * lower.length)],
      upper[Math.floor(Math.random() * upper.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    // Fill the rest of the password with random choices
    for (let i = 4; i < length; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the password
    password = password.sort(() => Math.random() - 0.5);
    
    setPassword(password.join(''));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Password Generator</h1>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Generated Password:
            </label>
            <div className="flex">
              <input
                type="text"
                value={password}
                readOnly
                className="w-full p-2 border rounded-l bg-gray-50"
              />
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="bg-gray-200 px-4 rounded-r hover:bg-gray-300 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;