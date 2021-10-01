import '../Auth.scss';
import {useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../../context/UserContext';
import {Link, useHistory} from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Login(props) {
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const [, setUserContext] = useContext(UserContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const result = await axios.post(`${BASE_URL}/users/login`,
      {
        password: state.password,
        username: state.email
      }, {
        withCredentials: true
      });

    setUserContext(oldValues => {
      return {...oldValues, token: result.data.token}
    });

    history.push('/dashboard');
  };


  return (
    <div>
      <form className="authForm" onSubmit={submitHandler}>
        <p className="title">Login</p>
        <label className="formField">
          Email
          <input type="email"
                 value={state.email}
                 onChange={handleChange}
                 name="email"
                 required/>
        </label>

        <label className="formField">
          Password
          <input type="password"
                 value={state.password}
                 onChange={handleChange}
                 name="password"
                 required/>
        </label>

        <input className="infoButton" type="submit" value="Login"/>
        <p>New to CarsHistory.com? <Link to={`/register`} >Create new user!</Link></p>
      </form>

    </div>
  );
}

export default Login;
