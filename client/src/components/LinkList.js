import { Link } from 'react-router-dom';

export const LinkList = ({ links }) => {
  if (!links.length) {
    return <p className="center">ни хуя нету</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Орининальная</th>
          <th>Сокращенная</th>
          <th>открыть</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>открыть</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
