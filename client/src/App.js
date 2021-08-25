import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MainPage from './Components/Mainpage';
import {BrowserRouter as Router,
        Route,
        Switch,
        Link
      } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/Login' component={Login}/>
        <Route path='/Signup' component={Signup}/>
        <Route path='/MainPage' component={MainPage}/>
      </Switch>
    </Router>
  );
}

export default App;
