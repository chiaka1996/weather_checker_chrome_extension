import React from 'react'
import ReactDOM from 'react-dom'

const test = <p>Hello World</p>

// const root = document.createElement('div');
// document.body.appendChild(root);
// ReactDOM.(test, root);

const root = ReactDOM.createRoot(document.createElement('div') as HTMLElement)
document.body.appendChild(root);
root.render(test, root)