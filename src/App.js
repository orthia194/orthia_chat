import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authprovider';
import Omok from './omok';
import OmoksRoom from './omoksRoom';
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
          <Route exact path="/omoksRoom" element={<OmoksRoom />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
