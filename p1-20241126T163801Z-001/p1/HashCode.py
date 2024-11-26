import hashlib

str = "Hello, How are you?"
encoded = str.encode()
result = hashlib.sha256(encoded)

print("String : " , end = "")
print(str)
print("Hash Value : ", end="")
print(result)
print("Hexadecimal equivalent : ", result.hexdigest())
print("Digest Size : ",end="")
print(result.digest_size)
print("Block Size : ", end = "")
print(result.block_size)