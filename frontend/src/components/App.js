
import '../App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Signupseller from './seller/Signupseller';
import Signupuser from './user/Signupuser';
import Loginseller from './seller/Loginseller';
import Loginuser from './user/Loginuser';
import Dashboard from './Dashboard';
import Managebook from './Managebook';
import Nav from './nav';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
       <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signupseller' element={<Signupseller />} />
      <Route path='/loginseller' element={<Loginseller />} />
      <Route path='/signupuser' element={<Signupuser />} />
      <Route path='/loginuser' element={<Loginuser />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/managebook' element={<Managebook />} />

    </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
