import '../Auth.scss';
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from '../../context/UserContext';
import {Link, useHistory} from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Register(props) {
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
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

    const result = await axios.post(`${BASE_URL}/users/signup`,
      {
        firstName: state.firstName,
        lastName: state.lastName,
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
        <p className="title">Register</p>
        <label className="formField">
          First name
          <input type="text"
                 value={state.firstName}
                 onChange={handleChange}
                 name="firstName"
                 required/>
        </label>

        <label className="formField">
          Last name
          <input type="text"
                 value={state.lastName}
                 onChange={handleChange}
                 name="lastName"
                 required/>
        </label>

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

        <input className="infoButton" type="submit" value="Register"/>
        <p>Already have an account? <Link to={`/login`} >Go to login!</Link></p>
      </form>
    </div>
  );
}

export default Register;
