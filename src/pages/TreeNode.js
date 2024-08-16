import React, { useState } from 'react';

const TreeNode = ({ node, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(node.id);
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      {node.children && node.children.length > 0 && (
        <span onClick={handleToggle} style={{ cursor: 'pointer', marginRight: '5px' }}>
          {expanded ? '-' : '+'}
        </span>
      )}
      {node.name}
      {expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
