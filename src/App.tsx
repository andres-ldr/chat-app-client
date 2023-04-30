import { Routes, Route } from 'react-router-dom';
import Home from './actions/views/Home';
import Auth from './actions/views/Auth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/auth' element={<Auth />}></Route>
    </Routes>
  );
}

export default App;
