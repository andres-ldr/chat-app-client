import { Routes, Route } from 'react-router-dom';
import Home from './actions/views/Home';
import Login from './actions/views/Login';
import Signup from './actions/views/Signup';
import SetImg from './actions/views/SetImg';
import Panel from './actions/views/Panel';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/setimg' element={<SetImg />}></Route>
      <Route path='/panel' element={<Panel />}></Route>
    </Routes>
  );
}

export default App;
