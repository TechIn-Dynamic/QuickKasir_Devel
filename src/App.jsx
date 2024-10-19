import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import KasirPage from './Kasir/KasirPage';
import Admin from './admin/Admin';

function App() {

  return (
    <>
      <Router basename='/QuickKasir/devel/'>
        <Routes>
          <Route path='/' element={<KasirPage />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
