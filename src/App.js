
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
      </Routes>
    </>
  );
}

export default App;
