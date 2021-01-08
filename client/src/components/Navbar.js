import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logautHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span>Хуй знает</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <NavLink to="/todo">Todo</NavLink>
          </li>
          <li>
            <a href="/" onClick={logautHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
