import React from 'react'
import ReactDOM from 'react-dom/client'
import Header_menu from './Header_menu.jsx'
import './index.css'
import Projects_list_gallery from "./Projects_list_gallery.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header_menu />
      <Projects_list_gallery />
  </React.StrictMode>,
)
