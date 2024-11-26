#SHA 256
import hashlib

string = "Hello how are you"

encoded = string.encode()

result = hashlib.sha256(encoded)

print("String: ",end="")
print(string)

print("Hash: ",end="")
print(result)

print("Hexadecimal equivalant: ",result.hexdigest)

print("Digest Size: ",end="")
print(result.digest_size)

print("Block Size: ",end="")
print(result.block_size)

