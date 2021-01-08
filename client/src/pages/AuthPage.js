import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { UseMessage } from '../hooks/message.hook';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = UseMessage();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Хуй знает</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Заходи</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="введи email"
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="введи пароль"
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              type="button"
              className="btn yellow darken-4"
              style={{ marginRight: '10px' }}
              disabled={loading}
              onClick={loginHandler}
            >
              войти
            </button>
            <button
              type="button"
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
