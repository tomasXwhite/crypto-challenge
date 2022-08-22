import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import CryptoPopUp from './components/CryptoPopUp/CryptoPopUp'

function App() {

  return (
    <div className='beutyBg '>
      <Route exact path='/' component={Home} />
      <Route exact path='/info/:crypto' component={CryptoPopUp} />
    </div>
  )
}

export default App
