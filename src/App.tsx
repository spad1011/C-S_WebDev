import './App.scss'
import { Link } from 'react-router-dom'
import { paths } from './config/paths'
import { NavBar } from './components/NavBar/NavBar'

function App() {

  return (
    <>
      <NavBar/>
      
      <Link to={`/${paths.game}`}> testing </Link>
    </>
  )
}
//todo change typescript version

export default App
