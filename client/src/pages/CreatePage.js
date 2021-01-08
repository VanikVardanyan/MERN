import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');
  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '20px' }}>
        <div className="input-field">
          <input
            placeholder="введи email"
            value={link}
            id="link"
            type="text"
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="email">введи ссылку</label>
        </div>
      </div>
    </div>
  );
};
