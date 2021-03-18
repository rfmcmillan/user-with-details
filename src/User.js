import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = ({ user }) => {
  //const id = props.match.params.id * 1;
  //const user = props.users.find((user) => user.id === id);
  console.log(user);
  if (!user.id) {
    return '...loading user';
  }
  return (
    <div>
      Details for {user.name}
      <br />
      <Link to={`/users/${user.id}/update`}>Update</Link>
    </div>
  );
};

//the function passed into the connect() is the MapStateToProps function that react-redux uses
//he does this logic here so that he doesn't have to do it within the User component.
//But all he is doing is setting the user const if the user id matches the 'match' prop's id prop

export default connect((state, otherProps) => {
  const user =
    state.users.find((user) => user.id === otherProps.match.params.id * 1) ||
    {};

  return { user };
})(User);
