import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './Routes/ProtectedRoute'
import Home from './pages/Home'
import Logout from './Routes/Logout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Game from './pages/game'
import Register from './pages/register'

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/game' element={<ProtectedRoute> <Game /></ProtectedRoute>} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
