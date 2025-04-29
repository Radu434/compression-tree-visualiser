import { useState } from "react";
import { useMemo } from "react";
import "./index.css";
import TextInput from "./components/TextInput";
import HuffmanTreeVisualizer from "./components/HuffmanTreeVisualiser";
import HuffmanService from "./services/HuffmanService.js";
import nodeToD3Format from "./services/NodeToD3Format.js";
import { sort } from "d3";

function App() {
  const [text, setText] = useState(""); // State for the input text
  const [isIterative, setIterative] = useState(false); // State for the step-by-step checkbox
  const [huffmanTree, setHuffmanTree] = useState(null); // State for the Huffman tree
  const [huffmanCodes, setHuffmanCodes] = useState(null);
  const [compressedBytes, setCompressedBytes] = useState(null);
  const [uncompressedBytes, setUnCompressedBytes] = useState(null);
  const [frequencyMap, setFrequencyMap] = useState(null);


  
  const handleHuffmanCompress = (inputText) => {
    if (!inputText) {
      return null;
    }
    const huffmanService = new HuffmanService();
    const frequencyMap = huffmanService.getFrequencyMap(inputText);
    setFrequencyMap(frequencyMap);
    if (isIterative) {
      const iterations = huffmanService.buildHuffmanTreeSteps(frequencyMap);
      const huffmanCodes = huffmanService.generateHuffmanCodes(
        iterations[iterations.length - 1]
      );
      setHuffmanCodes(huffmanCodes);
      const compressedBytes = huffmanCodes
        .entries()
        .reduce((acc, [char, code]) => {
          return acc + code.length * frequencyMap.get(char);
        }, 0);
      setCompressedBytes(compressedBytes);
      setUnCompressedBytes(inputText.length * 8);
      for (let i = 0; i < iterations.length; i++) {
        if (isIterative) {
          setTimeout(() => {
            const tree = nodeToD3Format(iterations[i]);
            setHuffmanTree(tree);
          }, 500 * i);
        }
      }
    } else {
      const root = huffmanService.buildHuffmanTree(frequencyMap);
      const tree = nodeToD3Format(root);
      const huffmanCodes = huffmanService.generateHuffmanCodes(root);
      setHuffmanCodes(huffmanCodes);
      setHuffmanTree(tree);
      const compressedBytes = huffmanCodes
        .entries()
        .reduce((acc, [char, code]) => {
          return acc + code.length * frequencyMap.get(char);
        }, 0);
      setUnCompressedBytes(inputText.length * 8);
      setCompressedBytes(compressedBytes);
    }
  };
  const sortedCodes = useMemo(() => {
    if (!huffmanCodes || !frequencyMap) return [];
  
    return [...huffmanCodes.entries()].sort(([charA], [charB]) => {
      const freqA = frequencyMap.get(charA);
      const freqB = frequencyMap.get(charB);
      return freqA === freqB
        ? charA.localeCompare(charB)
        : freqB - freqA;
    });
  }, [huffmanCodes, frequencyMap]);
  return (
<div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 px-4 sm:px-10">
<div className="flex justify-center w-screen bg-blue-900 shadow-black shadow-lg sticky top-0 z-10">
  <h1 className="text-white px-1 hover:text-amber-200 text-lg sm:text-2xl">
    Huffman Compression Visualiser
  </h1>
</div>
<div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 ">
    <TextInput
      text={text}
      setText={setText}
      onHuffmanCompress={handleHuffmanCompress}
      setIterative={setIterative}
    />  
        {huffmanCodes &&frequencyMap && (
     <div className="relative max-h-80   overflow-x-auto shadow-md sm:rounded-lg">
     <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
         <tr>
           <th scope="col" className="px-6 py-3">Character</th>
           <th scope="col" className="px-6 py-3">Code</th>
           <th scope="col" className="px-6 py-3">Frequency</th>
         </tr>
       </thead>
       <tbody>
         {sortedCodes
    
           .map(([char, code], index) => (
             <tr
               key={index}
               className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
             >
               <th
                 scope="row"
                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
               >
                 {char === " " ? "[space]" : char === "\n" ? "[\\n]" : char}
               </th>
               <td className="px-6 py-4">{code}</td>
               <td className="px-6 py-4">{frequencyMap.get(char)}</td>
             </tr>
           ))}
       </tbody>
     </table>
   </div>
        )}
      </div>
      {huffmanTree && (
        <div className="flex flex-row items-center justify-center mt-4 gap-10">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Uncompressed Bytes: {uncompressedBytes}
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Compressed Bytes: {compressedBytes}
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Compression ratio:{" "}
            {(
              100 -
              ((uncompressedBytes - compressedBytes) / uncompressedBytes) * 100
            ).toFixed(2)}
            %
          </span>
        </div>
      )}
      <div
        className="flex flex-col items-center justify-center
             w-full h-[300px] sm:h-[500px] bg-white border-2 border-blue-500
             mb-10 overflow-hidden rounded-lg"
      >
        {huffmanTree && <HuffmanTreeVisualizer treeData={huffmanTree} />}
      </div>
    </div>
  );
}

export default App;
