import '../Auth.scss';
import {useContext, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../../context/UserContext';
import {Link, useHistory} from "react-router-dom";

function Login(props) {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const result = await axios.post(`http://localhost:5000/users/login`,
      {
        password,
        username: email
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
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                 required/>
        </label>

        <label className="formField">
          Password
          <input type="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 required/>
        </label>

        <input className="infoButton" type="submit" value="Login"/>
        <p>New to CarsHistory.com? <Link to={`/register`} >Create new user!</Link></p>
      </form>

    </div>
  );
}

export default Login;
