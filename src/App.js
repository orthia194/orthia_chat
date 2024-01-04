import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import Omok from './omok';
import SignUp from './SignUp';
import Login from './login';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/omok" element={<Omok />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
