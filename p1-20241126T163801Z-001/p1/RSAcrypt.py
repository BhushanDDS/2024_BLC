# Import necessary modules for RSA 256 cryptography
from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from binascii import hexlify

# Define the message to be encrypted and decrypted
message = b"Public and Private Key Encryption"

# Generate a private key with a key size of 1024 bits
private_key = RSA.generate(1024)

# Generate a public key from the private key
public_key = private_key.public_key()

# Print the types of the private and public keys
print(type(private_key), type(public_key))

# Export the private and public keys in PEM format
private_pem = private_key.export_key().decode()
public_pem = public_key.export_key().decode()

# Print the types of the private and public key strings
print(type(private_pem), type(public_pem))

# Write the private and public keys to files
with open('private_pem.pem', 'w') as pr:
    pr.write(private_pem)
with open('public_pem.pem', 'w') as pr:
    pr.write(public_pem)

# Read the private and public keys from files
pr_key = RSA.import_key(open('private_pem.pem', 'r').read())
pu_key = RSA.import_key(open('public_pem.pem', 'r').read())

# Print the types of the imported private and public keys
print(type(pr_key), type(pu_key))

# Create a cipher suite for encryption using the public key
cipher_suite = PKCS1_OAEP.new(key=pu_key)

# Encrypt the message using the cipher suite
cipher_text = cipher_suite.encrypt(message)

# Print the encrypted cipher text in hexadecimal format
print("Cipher Text: ", hexlify(cipher_text))

# Create a cipher suite for decryption using the private key
plain = PKCS1_OAEP.new(key=pr_key)

# Decrypt the cipher text using the cipher suite
plain_text = plain.decrypt(cipher_text)

# Print the decrypted plain text
print(plain_text)