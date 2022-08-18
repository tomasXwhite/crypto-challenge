import reactLogo from './assets/react.svg'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home/Home'

function App() {

  return (
   <div>
    hi!
    <Route exact path='/home' component={Home} />
   </div>
  )
}

export default App
