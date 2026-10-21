import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css';
import Home from './pages/Home.jsx';
import Levels from './pages/Learn.jsx';
import Note from './pages/Note.jsx';
import Level from './pages/Level.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import UserProgress from './pages/UserProgress.jsx';

export default function App(){
    return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="UserProgress" element={<UserProgress />}/>

        <Route path="Learn">
          <Route index element={<Levels/>} />
          <Route path=":courseId/:pageOrder" element={<Level />} />
        </Route>

        <Route path="Note" element={<Note/>}/>
        <Route path="Register" element={<Register/>}/>
        <Route path="Login" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
    )
}
