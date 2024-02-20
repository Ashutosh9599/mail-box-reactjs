import SignUpPage from './Auth/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<SignUpPage />} />
          </Routes>
    </Router>
  );
}

export default App;
