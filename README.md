# Huffman Compression Visualizer

This is my very first **React project**! 🎉  
It showcases a visualization of the **Huffman coding algorithm**, which is commonly used for data compression.

### Project Overview

The **Huffman Compression Visualizer** allows users to:
- Input custom text to analyze.
- View the **Huffman Tree** that represents the compression process.
- See the frequency of each character in the input text.
- Observe the compressed byte size compared to the uncompressed byte size.
- Optionally visualize the iterative steps of the Huffman tree construction process.

This project helped me explore the basics of React, such as:
- State management with `useState`.
- Component-based architecture.
- Props for passing data between components.
- Iterative rendering using `setTimeout`.

### Features

- **Text Input**: Enter any text for compression.
- **Huffman Tree Visualization**: Displays the tree structure representing the encoding process.
- **Byte Comparison**: Compares compressed vs. uncompressed byte sizes.
- **Character Frequency Analysis**: View how often each character occurs in the input.
- **Iterative Visualization**: Optionally toggle step-by-step tree construction.

---

### Running Locally

To run the project locally on your machine:

1. Clone the repository:
   
   ```bash
   git clone https://github.com/Radu434/compression-tree-visualiser.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser, and go to:
   ```bash
   http://localhost:5173
   ```

---

### Technologies Used

- **React 19.0.0**:
- **Tailwind CSS 4.1.4**: 
- **d3.js**: 
- **Vite**:

---

### Known Issue

- **Compressed Bytes for Single Character Input**: When the input text consists of a single repeated character, the compressed bytes are displayed as `0`. This is because, in Huffman encoding, only one character does not require encoding, as there are no other symbols to differentiate it from. This is an edge case inheriting from the nature of the algorithm.

---

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

Thank you for taking the time to check out my first React project! 😊
