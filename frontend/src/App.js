import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { useState, useMemo } from 'react';
import PageChat from './Components/Chat.jsx';
import Page404 from './Components/Page404.jsx';
import PageLogin from './Components/Login.jsx';
import AuthContext from './contexts/index.jsx';
import SignUp from './Components/SignUp.jsx';

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
  const token = localStorage.getItem('userId');
  const location = useLocation();
  return (
    (token) ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <PageChat />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<PageLogin />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
