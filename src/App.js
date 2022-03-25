import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Interfaces from './components/cisco/interfaces/Interfaces'
import Rip from './components/cisco/routingProtocols/Rip'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/interfaces" element={<Interfaces />} />
        <Route path="/rip" element={<Rip />} />
      </Routes>
    </ >



  );
}

export default App;
