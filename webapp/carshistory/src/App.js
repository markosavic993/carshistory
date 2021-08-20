import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Dashboard from './views/dashboard/Dashboard';
import SingleCar from './views/singlecar/SingleCar';
import logo from './assets/images/car-icon.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="navigation">
            <ul>
              <li>
                <Link className="App-link" to="/dashboard">Dashboard</Link>
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
          <Route path="/cars/:carId">
            <SingleCar />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
