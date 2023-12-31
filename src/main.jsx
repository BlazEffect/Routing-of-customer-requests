import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import '../src/assets/css/App.css';
import '../src/assets/css/Main.css';
import '../src/assets/css/Chat.css';
import '../src/assets/css/Login.css';
import '../src/assets/css/Admin.css';
import router from './router/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
