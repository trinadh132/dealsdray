import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './home'
import Dashboard  from './dashboard'
import Login  from './login'
import Createemployee from './createemplyoee'
import Editemployee from './editemployee'

function App() {
  return(
    <BrowserRouter>
      <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/employee' element={<Createemployee />}/>
      <Route path='/edit' element={<Editemployee />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App
