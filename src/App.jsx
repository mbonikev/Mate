import React from 'react'
import Home from './pages/Home'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ToolsAndTechs from './pages/ToolsAndTechs'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/tools_techs' element={<ToolsAndTechs />} /> */}
      </Routes>
    </HashRouter>
  )
}

export default App