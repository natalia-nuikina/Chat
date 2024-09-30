import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { useMemo } from 'react';
import PageChat from './Components/Chat.jsx';
import Page404 from './Components/Page404.jsx';
import PageLogin from './Components/Login.jsx';
import AuthContext from './contexts/index.jsx';
import SignUp from './Components/SignUp.jsx';
import routes from './routes.js';
import i18n from './i18next.js';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const logIn = (token) => {
    localStorage.setItem('userId', JSON.stringify(token));
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    window.location.href = routes.pages.loginPage();
  };
  const getToken = () => localStorage.getItem('userId');
  const value = useMemo(() => ({
    logIn, logOut, getToken,
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const token = auth.getToken();
  const location = useLocation();
  return (
    (token) ? children : <Navigate to={routes.pages.loginPage()} state={{ from: location }} />
  );
};

const App = () => {
  i18n();
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={routes.pages.chatPage()}
            element={(
              <PrivateRoute>
                <PageChat />
              </PrivateRoute>
            )}
          />
          <Route path={routes.pages.loginPage()} element={<PageLogin />} />
          <Route path={routes.pages.page404()} element={<Page404 />} />
          <Route path={routes.pages.signUpPage()} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
