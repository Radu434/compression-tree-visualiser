import Node from "../models/node.js";

class HuffmanService {
    getFrequencyMap(string) {
        const frequency = {};
        const frequencyMap = new Map();
        for (const char of string) {
            frequency[char] = (frequency[char] || 0) + 1;
            frequencyMap.set(char, frequency[char]);
        }
        return frequencyMap;
    }

    buildHuffmanTree(frequencyMap) {
        const nodes = [];

        // Step 1: Create leaf nodes
        for (const [char, frequency] of frequencyMap) {
            nodes.push(new Node(char, frequency));
        }

        // Step 2: Build the tree
        while (nodes.length > 1) {
            nodes.sort((a, b) => a.frequency - b.frequency);

            const left = nodes.shift();
            const right = nodes.shift();

            const newNode = new Node(null, left.frequency + right.frequency);
            newNode.left = left;
            newNode.right = right;

            nodes.push(newNode);
        }

        // Step 3: Return the root node
        return nodes[0];
    }


    generateHuffmanCodes(root) {
        const codes = new Map();

        // Helper function to traverse the tree
        function traverseTree(node, code) {
            // If this is a leaf node (has a character), store its code
            if (node.char !== null) {
                codes.set(node.char, code);
                return;
            }

            // Traverse left (add 0 to the code)
            if (node.left) {
                traverseTree(node.left, code + '0');
            }

            // Traverse right (add 1 to the code)
            if (node.right) {
                traverseTree(node.right, code + '1');
            }
        }

        // Start traversal from root with empty code
        traverseTree(root, '');

        return codes;
    }

// Function to encode a string using Huffman codes
    encodeString(str, huffmanCodes) {
        let encodedString = '';

        for (const char of str) {
            encodedString += huffmanCodes.get(char);
        }

        return encodedString;
    }

// Function to decode an encoded string using the Huffman tree
    decodeString(encodedString, huffmanTree) {
        let decodedString = '';
        let currentNode = huffmanTree;

        for (const bit of encodedString) {
            // Navigate the tree based on the bit
            currentNode = bit === '0' ? currentNode.left : currentNode.right;

            // If we've reached a leaf node
            if (currentNode.char !== null) {
                decodedString += currentNode.char;
                // Reset to the root to start decoding the next character
                currentNode = huffmanTree;
            }
        }

        return decodedString;
    }

    buildHuffmanTreeSteps(frequencyMap) {
        const nodes = [];
        const iterations = []; // Store the iterations for visualization
        // Step 1: Create leaf nodes
        for (const [char, frequency] of frequencyMap) {
            nodes.push(new Node(char, frequency));
        }

        // Step 2: Build the tree
        while (nodes.length > 1) {
            nodes.sort((a, b) => a.frequency - b.frequency);

            const left = nodes.shift();
            const right = nodes.shift();

            const newNode = new Node(null, left.frequency + right.frequency);
            newNode.left = left;
            newNode.right = right;
            nodes.push(newNode);
            iterations.push(nodes[0]); // Store the current state of nodes for visualization

        }

        // Step 3: Return the root node
        return iterations;
    }
}

export default HuffmanService;
// The HuffmanService class is responsible for building the Huffman tree and generating the frequency map. It contains methods to get the frequency map from a string and to build the Huffman tree using the frequency map. The class uses a Node class to represent each node in the Huffman tree, which contains character data, frequency, and pointers to left and right child nodes.