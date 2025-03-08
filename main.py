import random
import string

def generate_password(length):
    if length < 6:  # Minimum password length (adjust as needed)
        print("Password length should be at least 6 characters.")
        return
    
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    numbers = string.digits
    symbols = "!@#$%^&*()_<|+>/"
    all_chars = lower + upper + numbers + symbols

    # Ensure at least one character from each category
    password = [
        random.choice(lower),
        random.choice(upper),
        random.choice(numbers),
        random.choice(symbols)
    ]

    # Fill the rest of the password with random choices
    password += random.choices(all_chars, k=length - 4)
    
    # Shuffle the password to ensure randomness
    random.shuffle(password)
    
    # Convert list to string and return
    return ''.join(password)

# Input handling with validation
while True:
    try:
        length = int(input("Enter a password length (minimum 6 characters): "))
        if length >= 6:
            break
        else:
            print("Password length should be at least 6 characters.")
    except ValueError:
        print("Please enter a valid integer.")

password = generate_password(length)
print("Generated Password:", password)
