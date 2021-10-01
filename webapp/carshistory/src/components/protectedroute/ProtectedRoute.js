import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [userContext,] = useContext(UserContext);

  const isAuthenticated = userContext.token !== undefined;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
}

export default ProtectedRoute;
