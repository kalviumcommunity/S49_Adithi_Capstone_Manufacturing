
import WelcomeComponent from './components/mainpage';
import Search from './components/search';
import Title from './components/title';
import SignUpLogin from './components/login';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>  
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/search" element={<Search />} />
        <Route path="/title1" element={<Title />} />
        <Route path="/login" element={<SignUpLogin />} />
      </Routes>
    </div>
  );
}

export default App;