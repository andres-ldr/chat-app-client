import { selectUser } from './actions/redux/user/userSelector';
import NotFoundPage from './actions/views/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import Signup2 from './actions/views/Signup2';
import SetImg from './actions/views/SetImg';
import Signup from './actions/views/Signup';
import { useSelector } from 'react-redux';
import Login from './actions/views/Login';
import Panel from './actions/views/Panel';
import Home from './actions/views/Home';

function App() {
  const { user } = useSelector(selectUser);

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/setimg' element={<SetImg />}></Route>
      <Route path='/signup-step-2' element={<Signup2 />}></Route>( (
      {user && <Route path='/panel' element={<Panel />}></Route>}
      )
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
