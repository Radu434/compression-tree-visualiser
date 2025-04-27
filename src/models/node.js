class Node {
  constructor(char, frequency) {
    this.char = char; // Character stored in the node
    this.frequency = frequency; // Frequency stored in the node
    this.left = null; // Left child node
    this.right = null; // Right child node
  }
}
export default Node;
// The Node class represents a node in the Huffman tree. Each node contains a character, its frequency, and pointers to its left and right child nodes. The constructor initializes these properties when a new instance of the Node class is created.
