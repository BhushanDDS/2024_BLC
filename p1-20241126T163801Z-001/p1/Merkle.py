import hashlib

class MerkleTree:
    def __init__(self, leaves):
        self.leaves = [self._hash(leaf) for leaf in leaves]
        self.root = self._build_tree(self.leaves)

    def _build_tree(self, leaves):
        if len(leaves) == 1:
            return leaves[0]

        next_level = []
        for i in range(0, len(leaves), 2):
            if i + 1 < len(leaves):
                combined = leaves[i] + leaves[i + 1]
            else:
                combined = leaves[i] + leaves[i]
            next_level.append(self._hash(combined))

        return self._build_tree(next_level)

    def _hash(self, data):
        return hashlib.sha256(data.encode()).hexdigest()

    def get_root(self):
        return self.root

    def get_proof(self, index):
        proof = []
        current_index = index
        current_level = self.leaves

        while len(current_level) > 1:
            if current_index % 2 == 0:  # Even index
                if current_index + 1 < len(current_level):
                    proof.append(('right', current_level[current_index + 1]))
            else:  # Odd index
                proof.append(('left', current_level[current_index - 1]))

            current_index //= 2
            current_level = self._get_next_level(current_level)

        return proof

    def _get_next_level(self, current_level):
        next_level = []
        for i in range(0, len(current_level), 2):
            if i + 1 < len(current_level):
                combined = current_level[i] + current_level[i + 1]
            else:
                combined = current_level[i] + current_level[i]  # Handle odd number of nodes by duplicating
            next_level.append(self._hash(combined))

        return next_level

    def verify_proof(self, proof, target_hash):
        current_hash = target_hash
        for direction, sibling_hash in proof:
            if direction == 'left':
                combined = sibling_hash + current_hash
            else:
                combined = current_hash + sibling_hash
            current_hash = self._hash(combined)

        return current_hash == self.root

# Example usage:
leaves = ["leaf1", "leaf2", "leaf3", "leaf4"]
tree = MerkleTree(leaves)
root = tree.get_root()
print("Merkle root:", root)

proof = tree.get_proof(0)
print("Proof for leaf1:", proof)

target_hash = hashlib.sha256("leaf1".encode()).hexdigest()
is_valid = tree.verify_proof(proof, target_hash)
print("Is proof valid?", is_valid)
