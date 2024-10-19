import './App.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

// Setting up global Variable for multiple components (could be simplified(LOW PRIORITY))
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

export default App;
