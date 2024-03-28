
import WelcomeComponent from './components/mainpage';
import Search from './components/search';
import Title from './components/title';
import SignUpLogin from './components/login';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>  
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