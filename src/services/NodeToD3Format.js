function nodeToD3Format(node) {
  if (!node) return null;

  const name = node.char??"";
  const value =node.frequency;
  const d3Node = { name, value };
  if (node.left || node.right) {
    d3Node.children = [];
    if (node.left) d3Node.children.push(nodeToD3Format(node.left));
    if (node.right) d3Node.children.push(nodeToD3Format(node.right));
  }
  return d3Node;
}
export default nodeToD3Format;