import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loadUsers, loadThings, createUser } from './store';
import Nav from './Nav';
import Users from './Users';
import User from './User';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import Create from './Create';
import Update from './Update';

const Home = () => <hr />;

class AppClass extends Component {
  componentDidMount() {
    this.props.bootstrap();
  }
  render() {
    return (
      //HashRouter: a Router from react-router-dom that uses the # portion of the URL (window.location.hash) to route to different pages
      <Router>
        <div>
          {/*
          Route: per react-router docs, maybe the most important component in React Router to learn
          It renders some UI - in this case a React Component - when its path matches the current URL.
          - the component prop contains the React component to be rendered when the url matches the path.
          - 'exact' when exact is added as a prop, will only display the component if the url matches the path prop exactly.
          */}
          <Route component={Nav} />
          <Route component={Home} path="/" exact />
          <Route component={Users} path="/users" exact />
          <Switch>
            <Route component={Create} path="/users/create" />
            <Route component={User} path="/users/:id" exact />
          </Switch>
          <Route component={Update} path="/users/:id/update" />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadUsers());
      dispatch(loadThings());
    },
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppClass);
//the 'exact' attribute above makes it so that the Home component only appears
//on the path that is an axact match for '/'

render(
  //<Provider> allows any nested components to have access to the store.
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
