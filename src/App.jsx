import reactLogo from './assets/react.svg'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Browser from './components/Browser/Browser'
import CryptoPopUp from './components/CryptoPopUp/CryptoPopUp'
import Spinner from './components/Spinner/Spinner'

function App() {

  return (
   <div className='beutyBg '>
    <Route exact path='/home' component={Home} />
    <Route exact path='/home/browser' component={Browser}/>
    <Route exact path='/home/info/:crypto' component={CryptoPopUp}/>
    <Route exact path='/home/spinner' component={Spinner}/>
   </div>
  )
}

export default App
