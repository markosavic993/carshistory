import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Dashboard from './views/dashboard/Dashboard';
import SingleCar from './views/singlecar/SingleCar';
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import logo from './assets/images/car-icon.svg';
import CreateUpdateCar from './views/createupdatecar/CreateUpdateCar';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import {useCallback, useContext, useEffect} from 'react';
import {UserContext} from './context/UserContext';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const VERIFY_USER_TIMEOUT = parseInt(process.env.REACT_APP_VERIFY_USER_TIMEOUT) || 60000;

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    axios.post(`${BASE_URL}/users/refreshToken`,
      {},
      { withCredentials: true }
    ).then(async response => {
      if (response.status === 200) {
        const data = await response.json()
        setUserContext(oldValues => {
          return {...oldValues, token: data.token}
        })
      } else {
        setUserContext(oldValues => {
          return {...oldValues, token: null}
        })
      }
      setTimeout(verifyUser, VERIFY_USER_TIMEOUT)
    })
  }, [setUserContext]);

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div>
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <div className="navigation">
            <ul>
              <li>
                <Link className="App-link" to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link className="App-link" to="/new">Add new car</Link>
              </li>
            </ul>
          </div>
        </div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <ProtectedRoute path="/cars/:carId" component={SingleCar}/>
          <ProtectedRoute path="/dashboard" component={Dashboard}/>
          <ProtectedRoute path="/new" component={CreateUpdateCar}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
