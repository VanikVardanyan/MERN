import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const TodoPage = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const allTodos = useCallback(async () => {
    try {
      const fetched = await request('/api/todo', 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setTodos(fetched);
    } catch (e) {}
  }, [auth.token, request]);
  useEffect(() => {
    window.M.updateTextFields();
    allTodos();
  }, [auth.token, allTodos]);

  const handleTodo = async (e) => {
    e.preventDefault();
    try {
      await request(
        '/api/todo/create',
        'POST',
        {
          todo,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTodo('');
      allTodos();
    } catch (e) {}
  };
  const handleDelet = async (id) => {
    try {
      await request(
        '/api/todo/delet',
        'POST',
        {
          id,
        },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setTodo('');
      allTodos();
    } catch (e) {}
  };
  const handleChange = async (id, isCheck) => {
    if (isCheck) {
      try {
        await request(`/api/todo/unchecked/${id}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`,
        });
        setTodo('');
        allTodos();
      } catch (e) {}
    } else {
      try {
        await request(`/api/todo/checked/${id}`, 'GET', null, {
          Authorization: `Bearer ${auth.token}`,
        });
        setTodo('');
        allTodos();
      } catch (e) {}
    }
  };
  return (
    <div className="row">
      <div
        className="col s8 offset-s2"
        style={{ paddingTop: '20px', marginBottom: '40px' }}
      >
        <form className="input-field" onSubmit={handleTodo}>
          <input
            placeholder="введи email"
            value={todo}
            id="todo"
            type="text"
            onChange={(e) => setTodo(e.target.value)}
          />
          <label htmlFor="todo">Новое задание</label>
          <button
            type="submit"
            className="btn yellow darken-4"
            style={{ marginRight: '10px' }}
          >
            Добавить
          </button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Дата</th>
            <th>Название</th>
            <th>Действия</th>
            <th>выполнено</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((elem, index) => {
            return (
              <tr key={elem._id}>
                <td>{index + 1}</td>
                <td>{elem.todo}</td>
                <td>{new Date(elem.date).toLocaleDateString()}</td>
                <td>
                  <button
                    type="button"
                    className="btn red darken-2"
                    onClick={() => handleDelet(elem._id)}
                  >
                    del
                  </button>
                </td>
                <td>
                  <p>
                    <label>
                      <input
                        type="checkbox"
                        class="filled-in"
                        id="todocheck"
                        checked={elem.isChecked}
                        onChange={() => handleChange(elem._id, elem.isChecked)}
                      />
                      <span>{elem.isChecked ? 'выполнено' : 'выполнить'}</span>
                    </label>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
