# Implementation of Caesar Cipher
def encrypt(text, shift):
    result = ""
    for i in range(len(text)):
        char = text[i]
        if(char == " "):
            result += " "
        else:
            if(char.isupper()):
                result += chr((ord(char) + ord(shift) - 65) % 26 + 65)
            else:
                result += chr((ord(char) + ord(shift) - 97) % 26 + 97)
    
    return result

text = input("Enter text to encrypt : ")
shift = input("Enter the value of shift : ")

print("Plain Text : " + text)

print("Shift pattern : " + shift)

print("Ceaser Cipher Text is " + encrypt(text, shift))
        
