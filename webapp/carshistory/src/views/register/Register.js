import '../Auth.scss';
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from '../../context/UserContext';
import {Link, useHistory} from "react-router-dom";

function Register(props) {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userContext, setUserContext] = useContext(UserContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const result = await axios.post(`http://localhost:5000/users/signup`,
      {
        firstName,
        lastName,
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
        <p className="title">Register</p>
        <label className="formField">
          First name
          <input type="text"
                 value={firstName}
                 onChange={e => setFirstName(e.target.value)}
                 required/>
        </label>

        <label className="formField">
          Last name
          <input type="text"
                 value={lastName}
                 onChange={e => setLastName(e.target.value)}
                 required/>
        </label>

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

        <input className="infoButton" type="submit" value="Register"/>
        <p>Already have an account? <Link to={`/login`} >Go to login!</Link></p>
      </form>
    </div>
  );
}

export default Register;
