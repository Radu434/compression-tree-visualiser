import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

function TextInput({text, setText, onHuffmanCompress, setIterative}) {
    const handleInputChange = (e) => {
        setText(e.target.value); // Update the text state in App.jsx
    };
    const handleCheckChange = (e) => {
        setIterative(e.target.checked); // Update checked state in App.jsx
    }

    const handleButtonClick = () => {
        onHuffmanCompress(text); // Trigger the Huffman compression logic
    };


    return (
        <div className="mt-10 p-10">
            <form className="flex flex-col mx-auto gap-2 max-w-[vw-2/3]">
                <fieldset className="contents">
                    <div className="flex flex-col">
            <textarea
                name="input"
                id="input"
                rows="10"
                maxLength="4096"
                placeholder="Insert the text you want to compress. [Max 4096 chars]"
                value={text} // Controlled input
                onChange={handleInputChange}
                className="rounded-lg p-4 bg-gray-800 border-2 border-solid
               border-gray-550 font-mono font-medium text-sm text-white min-w-[600px]
                focus:outline-none focus:ring-2 focus:bg-blue-950"></textarea>
                    </div>
                    <div className="flex flex-row items-center justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleButtonClick} // Call the handler
                            className="rounded-lg p-2 bg-blue-950 border-2 border-solid
               border-blue-500 transition-colors
                hover:bg-blue-500
                text-white font-medium text-base leading-none
                 font-small 
                 flex flex-row items-center
                 justify-center gap-2">
                            <FontAwesomeIcon icon={faGear}/>
                            <span className="font-semibold">Compress Using Huffman</span>
                        </button>
                        <input
                            onChange={handleCheckChange}
                            type="checkbox"
                            id="iterative"
                            className="ml-4 mr-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded
                             focus:ring-blue-500 focus:ring-2, hover:bg-blue-600"
                        ></input>
                        <label
                            htmlFor="iterative"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300
                            hover:text-blue-800"
                        >Step-by-Step</label>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default TextInput;
