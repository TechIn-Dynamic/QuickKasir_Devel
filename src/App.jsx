import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import KasirPage from './Kasir/KasirPage';
import Admin from './admin/Admin';
import Login from './login/Login';

function App() {
  return (
    <>
      <Router basename='/QuickKasir_Devel'>
        <Routes>
          <Route path='/' element={<KasirPage />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
