import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import KasirPage from './Kasir/KasirPage'
import FormCreatePeriode from './components/FormCreatePeriode';

function App() {

  return (
    <> 
     <Router basename='/QuickKasir/devel/'>
            
          <Routes>
            <Route path='/' element={<KasirPage />}></Route>
            <Route path='/test-component' element={<FormCreatePeriode />}></Route>
          </Routes>
        
      </Router>
    </>
  )
}

export default App
