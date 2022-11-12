
import './index.css';
import Users from './views/Users';
import Home from './views/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/users' exact element={<Users/>}/>
        <Route path='*' exact element={<div className='text-white display-1 p-5'>404 <br/> <span className='display-5'>URL doesn't exist</span> </div>}/>
      </Routes>
    </>
  );
}

export default App;
