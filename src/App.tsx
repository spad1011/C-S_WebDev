import './App.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export interface LoggedInType {
  state: boolean;
}

export interface LoggedInContext{
  loggedIn: LoggedInType;
  setLoggedIn: React.Dispatch<React.SetStateAction<{ state: boolean }>>;
}

export function App() {
  const [loggedIn, setLoggedIn] = useState({
    state: sessionStorage.getItem('isLoggedInKey') === 'true',
  } as LoggedInType);

  return (
    <div>
      <Outlet context={{ loggedIn, setLoggedIn }} />
    </div>
  );
}
// todo change typescript version

export default App;
