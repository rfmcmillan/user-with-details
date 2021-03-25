import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from './store';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  async onSave(ev) {
    ev.preventDefault();
    try {
      await this.props.create(this.state.name);
      console.log('create called');
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }
  render() {
    const { name, error } = this.state;
    const { onChange, onSave } = this;
    return (
      <form onSubmit={onSave}>
        <pre>{!!error && JSON.stringify(error, null)}</pre>
        <input name="name" value={name} onChange={onChange} />
        <button>Save</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  console.log(history);
  return {
    create: (name) => dispatch(createUser(name, history)),
  };
};

export default connect(null, mapDispatchToProps)(Create);
