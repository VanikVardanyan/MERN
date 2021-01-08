import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

import 'materialize-css';
import './index.css';

const App = () => {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        logout,
        login,
        userId,
        isAuthenticated,
      }}
    >
      {isAuthenticated && <Navbar />}
      <div className="container">{routes}</div>
    </AuthContext.Provider>
  );
};

export default App;
