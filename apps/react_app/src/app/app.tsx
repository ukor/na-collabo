import styled from 'styled-components';


import { Route, Routes, Link } from 'react-router-dom';
import { Articles } from './articles';
import { CreateArticle } from './create';

const StyledApp = styled.div`
  // Your style here
`;

const username = `user-${Math.floor(Math.random() * 100) + 1}`;

export function App() {
  return (
    <StyledApp>

      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Article List</Link>
          </li>
          <li>
            <Link to="/create">Create New</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Articles username={username} />}
        />
        <Route
          path="/create"
          element={<CreateArticle username={username} />}
        />
      </Routes>
      {/* END: routes */}
    </StyledApp>
  );
}

export default App;
