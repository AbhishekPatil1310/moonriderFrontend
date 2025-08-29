import { useState } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routers/route'

function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}

export default App
