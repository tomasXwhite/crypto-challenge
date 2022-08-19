import reactLogo from './assets/react.svg'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Browser from './components/Browser/Browser'
import CryptoPopUp from './components/CryptoPopUp/CryptoPopUp'

function App() {

  return (
   <div>
    
    <Route exact path='/home' component={Home} />
    <Route exact path='/home/browser' component={Browser}/>
    <Route exact path='/home/browser/:crypto' component={CryptoPopUp}/>
   </div>
  )
}

export default App
