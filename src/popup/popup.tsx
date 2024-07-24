import React from 'react'
import {createRoot} from 'react-dom/client'


const root = document.createElement('div');
createRoot(document.body.appendChild(root)).render(<div>Hello world!</div>)