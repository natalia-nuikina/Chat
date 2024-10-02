import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageChat from './Components/Chat.jsx';
import Page404 from './Components/Page404.jsx';
import PageLogin from './Components/Login.jsx';
import SignUp from './Components/SignUp.jsx';
import routes from './routes.js';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.userReducer);
  const location = useLocation();
  return (
    (token.length > 0) ? children : (
      <Navigate
        to={routes.pages.loginPage()}
        state={{ from: location }}
      />
    )
  );
};

const App = ({ socket }) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routes.pages.chatPage()}
        element={(
          <PrivateRoute>
            <PageChat socket={socket} />
          </PrivateRoute>
        )}
      />
      <Route path={routes.pages.loginPage()} element={<PageLogin />} />
      <Route path={routes.pages.page404()} element={<Page404 />} />
      <Route path={routes.pages.signUpPage()} element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

export default App;
