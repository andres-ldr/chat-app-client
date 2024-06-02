import NotFoundPage from './actions/views/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import Login from './actions/views/Login';
import Panel from './actions/views/Panel';
import MultiStepForm from './actions/components/FormElements/MultiStepForm';

function App() {
  // const { user, isLoading } = useSelector(selectUser);

  return (
    <Routes>
      {/* <Route path='/' element={<Home />}></Route> */}
      <Route path='/' element={<Login />}></Route>
      <Route path='/signup' element={<MultiStepForm />}></Route>
      <Route path='/panel' element={<Panel />}></Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

// Esta auth el usuario
// sí acceder a la ruta panel
// no ocultar la ruta
