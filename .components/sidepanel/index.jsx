import React from 'react'
import "./index.css"

const flattenTree = (root) => {
  const stack = root
  .map(node => ({node, depth: 0}))
  .filter(el => el.node.title !== ".components")
  .filter(el => {
    if(!el.node.url && el.node.children?.length <= 0) {
      return false;
    }
    return true;
  });
  const flattenedNodes = [];

  while (stack.length > 0) {
    const { node, depth } = stack.pop();
    const flattenedNode = { ...node, depth };
    flattenedNodes.push(flattenedNode);

    // Push children in reverse order so they are processed in the correct order
    for (let i = node.children?.length - 1; i >= 0; i--) {
      if(node.children[i].title !== ".components"){
        stack.push({ node: node.children[i], depth: depth + 1 });
      }
    }
    
  }

  return flattenedNodes;
};


const Sidepanel = (props) => {
  
  return (
    <div className={`sidepanel-con ${props.show === "init" ? "" : props.show ? "show" : "hide" }`}>
      <ul className='sidepanel-list'>
        {flattenTree(props.linksTree).map((link, idx) => {
          return (
            <li
              style={{
                marginLeft: link.depth * 10
              }}
              className={`sidepanel-list-item ${link.url ? "url" : ""}`}
               key={idx}
            >
              <a 
                href={link.url}
                style={{
                  background: 'transparent'
                }}
              >{link.title}</a>
            </li>
          )
        })}
      </ul>
      <button type="button" onClick={props.closeSidepanel} className='close-icon'> 
        <img
          src="https://documentden-deployments.s3.us-east-1.amazonaws.com/public/2058d1f5-f692-4341-b4dc-2014ccad5ecc"
          alt=""
          width={26}
          height={26}
          style={{transform: "rotate(180deg)"}}
        ></img>
      </button>
    </div>
  )
}

export default Sidepanel;
