import { createStore, combineReducers, applyMiddleware } from 'redux';
const LOAD_USERS = 'LOAD_USERS';
const CREATE = 'CREATE';
const LOAD_THINGS = 'LOAD_THINGS';
import axios from 'axios';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';

/*
Reducers
- a reducer in the context of redux is a function that takes the previous state and an action and returns a new state object.
- the combineReducers function below then takes all of the states that are returned from the various reducers and adds them as properties within a larger combined state object.
- there are certain rules these reducer functions must follow if they are to work with combineReducers() below.
  - For any action that is not recognized, it must return the state given to it as the first argument.
  - It must never return undefined. It is too easy to do this by mistake via an early return statement, so combineReducers throws if you do that instead of letting the error manifest itself somewhere else.
*/
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE) {
    state = [...state, action.user];
  }
  return state;
};

const thingsReducer = (state = [], action) => {
  if (action.type === LOAD_THINGS) {
    state = action.things;
  }
  return state;
};

/*
Reducer Combiner
- as a reducer grows, it is helpful to split the reducer into separate functions. each managing indepent parts of state
- its first and only parameter is an object that holds multiple reducing funtions.
- it returns a reducer function that invokes every reducer inside the object that was passed in as the argument,
  and constructs a state object 'with the same shape'
*/
const reducer = combineReducers({
  users: usersReducer,
  things: thingsReducer,
});

/*
Create a Redux store with createStore()
- The first parameter is the reducer.
- applyMiddleware applies certain middleware that is helpful to Redux.
*/

/*
Thunks:
- a thunk is a function that is returned by another function
github.com: 'Redux-Thunk is the recommended middleware for basic Redux side effects logic, simple async logic like AJAX requests' Since we like to get data via AJAX requests (through axios) we need Redux-Thunk to help us do that.
- DaveCeddia.com: 'Redux-Thunk is middleware that looks at every action that passes through the system, and if it’s a function, it calls that function. That’s all it does.'
*/

//apply logger here if you'd like as well
const store = createStore(reducer, applyMiddleware(thunk));

//Action Creators--------------------------------------------
//- these make it easier to create an action within your code, if you need to create
// the same type of action multiple times.
// - it also makes your code more readable, I think

const _loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

const _createUser = (user) => {
  return {
    type: CREATE,
    user,
  };
};

const _loadThings = (things) => {
  return {
    type: LOAD_THINGS,
    things,
  };
};
//------------------------------------------------------
//These are functions that return the thunks that then dispatch the action creators that return the actual action object.
//- The redux-thunk middleware makes it so that the thunk receives two
// arguments: dispatch, so the thunk can dispatch the action and getState, so it can access the current state.
//The getState can be useful fro fetching new data
//----------------------------------------------------------------------------
const loadThings = () => {
  return async (dispatch) => {
    const things = (await axios.get('/api/things')).data;
    dispatch(_loadThings(things));
  };
};

const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get('/api/users')).data;
    dispatch(_loadUsers(users));
  };
};

const createUser = (name) => {
  return async (dispatch) => {
    const user = (await axios.post('/api/users', { name })).data;
    dispatch(_createUser(user));
  };
};
//-----------------------------------------------------------

export default store;
export { loadUsers, loadThings, createUser };
