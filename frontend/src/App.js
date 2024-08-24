// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { useState, useMemo } from 'react';
import { PageOne, Page404 } from './Components/Pages.jsx';
import PageLogin from './Components/Login.jsx';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  const value = useMemo(() => ({
    loggedIn, setLoggedIn, logIn, logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <PageOne />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<PageLogin />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
