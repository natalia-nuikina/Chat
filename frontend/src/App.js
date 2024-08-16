// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageLogin, Page404 } from './Components/Pages.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
