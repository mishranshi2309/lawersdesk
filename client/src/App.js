import './App.css';
import '../node_modules/antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Template from './components/pages/Template';
import TemplateSelection from './components/admin/TemplateSelection';
import Signup from './components/pages/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Main from './components/admin/main';
import Format from './components/pages/Format';
import Login from './components/pages/Login';


function App() {
  
  return(
    <Router>
    <Routes>
      <Route exact path='/' element={< Login />}></Route>
      <Route exact path='/signup' element={< Signup />}></Route>
      <Route exact path='/admin' element={< Main />}></Route>
      <Route exact path='/admin/setTemplate' element={< TemplateSelection />}></Route>
      <Route exact path='/template' element={< Template />}></Route>
      <Route exact path='/format' element={< Format />}></Route>

    </Routes>
    </Router>
  )
}

export default App;
