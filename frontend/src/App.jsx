import './App.css'
import { BrowserRouter ,  Routes ,Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import SendMoney from './pages/SendMoney.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Protected from './components/Protected.jsx';
function App() {
  const auth = localStorage.getItem('token');
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route element={<Protected/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
          <Route path="/signup" element={auth ? <Navigate to='/dashboard'/> :<Signup />} />
          <Route path="/signin" element={ auth ? <Navigate to ='/dashboard'/> :<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
