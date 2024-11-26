import random

def gcd(a, b):
    """Compute the greatest common divisor of a and b"""
    while b:
        a, b = b, a % b
    return a

def multiplicative_inverse(e, phi):
    """Compute the multiplicative inverse of e modulo phi"""
    def extended_gcd(a, b):
        if a == 0:
            return b, 0, 1
        else:
            gcd, x, y = extended_gcd(b % a, a)
            return gcd, y - (b // a) * x, x

    gcd, x, y = extended_gcd(e, phi)
    if gcd != 1:
        raise Exception("Modular inverse does not exist")
    else:
        return x % phi

def generate_keypair(p, q):
    """Generate a public and private key pair"""
    n = p * q
    phi = (p - 1) * (q - 1)

    # Choose e such that 1 < e < phi and gcd(e, phi) = 1
    e = random.randrange(2, phi)
    while gcd(e, phi) != 1:
        e = random.randrange(2, phi)

    # Compute d such that d*e = 1 (mod phi)
    d = multiplicative_inverse(e, phi)

    # Return public and private key pairs
    return ((e, n), (d, n))

def encrypt(pk, plaintext):
    """Encrypt the plaintext using the public key"""
    e, n = pk
    ciphertext = [pow(ord(char), e, n) for char in plaintext]
    return ciphertext

def decrypt(pk, ciphertext):
    """Decrypt the ciphertext using the private key"""
    d, n = pk
    plaintext = [chr(pow(char, d, n)) for char in ciphertext]
    return ''.join(plaintext)

# Example usage:
p = 61
q = 53
public, private = generate_keypair(p, q)
print("Public Key:", public)
print("Private Key:", private)

message = "Hello bhbhbhbh"
encrypted_message = encrypt(public, message)
print("Encrypted Message:", encrypted_message)

decrypted_message = decrypt(private, encrypted_message)
print("Decrypted Message:", decrypted_message)