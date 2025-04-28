import React, { useState, useRef, useEffect } from "react";
import "../index.css";
import Tree from "react-d3-tree";

function HuffmanTreeVisualizer({ treeData }) {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const renderCustomNodeElement = ({ nodeDatum }) => (
    <g>
      {!nodeDatum.children ? (
        <rect
          width="58"
          height="40"
          fill="lightblue"
          stroke="black"
          strokeWidth="2"
          x="-29.5"
          y="-27"
        />
      ) : (
        // Render a circle for non-leaf nodes
        <circle r="25" fill="white" stroke="black" strokeWidth="2" />
      )}
      <text
        fill="black"
        strokeWidth="0"
        x="0"
        y="8"
        textAnchor="middle"
        style={{ fontSize: "14px" }}
      >
        {nodeDatum.value}
      </text>
      <br />
      <text
        fill="black"
        strokeWidth="0"
        x="0"
        y="-10"
        textAnchor="middle"
        style={{ fontSize: "16px", fontWeight: "bold" }}
      >
        {nodeDatum.name === " "
          ? "[space]"
          : nodeDatum.name === "\n"
          ? "[\\n]"
          : nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div ref={treeContainer} className="w-full h-full bg-neutral-200   ">
      {dimensions.width > 0 && (
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: dimensions.width / 2, y: 100 }}
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          pathFunc="diagonal"
          pathClassFunc={() => "stroke-2"}
          renderCustomNodeElement={renderCustomNodeElement}
          nodeSize={{ x: 70, y: 120 }}
          zoomable={true}
        />
      )}
    </div>
  );
}

export default HuffmanTreeVisualizer;
