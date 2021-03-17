import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import faker from 'faker';
import { createUser } from './store';

const Nav = (props) => {
  return (
    <nav>
      {/*the 'to' prop is pretty self-explanatory / within Links you can pass any property that you can pass to an <a> tag like 'className' */}
      <Link
        to="/"
        className={props.location.pathname === '/' ? 'selected' : ''}
      >
        Home
      </Link>
      <Link
        to="/users"
        className={props.location.pathname === '/users' ? 'selected' : ''}
      >
        Users({props.users.length}){' '}
      </Link>
      <button onClick={() => props.create(faker.name.firstName())}>
        Create User
      </button>
    </nav>
  );
};
/*
this mapStateToProps function is passed as the first argument (it's optional) to the connect()(Nav) call below.
It takes the state as an argument (and optionally a second parameter called 'ownProps') and returns what is referred to as 'stateProps' as an object. React-Redux provides an object called 'state' as the first argument to this function.

Per React-Redux.org, "If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps."

Also, mapStateToProps has a second optional parameter called 'ownProps'. This references any properties that or passed into the new connected wrapper component.
*/

const mapStateToProps = (state) => {
  return state;
};

/*
this mapDispatchToProps function is passed as the second argument(it's optional) to the connect()(Nav) call below.
React-Redux provides a function called 'dispatch' or an object to the mapDispatchToProps function. If it is a function, the function's purpose is to dispatch actions to the store. See the react-redux documentation for more details and how mapDispatchToProps works if an object is provided.

It also has a second optional parameter, ownProps. This references any properties that are passed into the new connected wrapper component.

mapDispatchToProps returns an object that contains functions that dispatch to the store. This object , called 'dispatchProps' is merged as props to the connected component.
*/

const mapDispatchToProps = (dispatch) => {
  return {
    create: (name) => {
      dispatch(createUser(name));
    },
  };
};

/*
connect() comes from react-redux. It allows us to connect a React component to a Redux store. The mapStateToProps function takes data from the store (in the form of an object called 'state') and maps it as props on the given component, in this case the Nav component. The optional MapDispatchToProps function provides functions (in the form of a function called 'dispatch') that can be used to dispatch actions to the store. If MapDispatchToProps isn't provided, a default 'dispatch' will be provided to connect().

It doesn't modify the component class that is passed to it. Instead, it returns a new connected component.
The returns from mapStateToProps and mapDispatchToProps are provided to the new connected component.
Now the connected React component doesn't have to have props directly entered into it whenever it is instantiated. Instead, it receives them automatically from this React-Redux connection to the Redux store.
*/

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
