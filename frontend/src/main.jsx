import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"

import './index.css'
import Home from './pages/Home.jsx'
import Levels from './pages/Levels.jsx'
import Note from './pages/Note.jsx'
import Level from './pages/Level.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="Levels">
          <Route index element={<Levels/>} />
          <Route path=":levelId" element={<Level />} />
        </Route>
        <Route path="Note" element={<Note/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
