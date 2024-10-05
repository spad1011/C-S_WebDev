import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {ErrorDetails} from './pages/ErrorDetails/ErrorDetails.tsx';
import { paths } from './config/paths.tsx'
import App from './App.tsx';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Game } from './pages/game.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Start } from './components/Start/Start.tsx';

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <App />,
    errorElement: <ErrorDetails/>,
    children: [
      {
        errorElement: <ErrorDetails/>,
        children: [
          {
            index: true,
            element: <Start/>
          },
          {
            path: paths.game,
            element: <Game/>
          }
        ]
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
