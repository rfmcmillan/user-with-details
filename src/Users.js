import React from 'react';
import { connect } from 'react-redux';
import { createUser } from './store';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = ({ users, createUser }) => {
  return (
    <div>
      <button onClick={() => createUser(Math.random())}>Create User</button>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`users/${user.id}`}>{user.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (name) => {
      dispatch(createUser(name));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Users);
