
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import EventState from './context/Events/EventState';

function App() {
  return (
    <>
      <EventState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>

        </Router>
      </EventState>
    </>
  );
}

export default App;
