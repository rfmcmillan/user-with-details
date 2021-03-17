import React from 'react';
import { connect } from 'react-redux';

const Things = ({ things }) => {
  return (
    <ul>
      {things.map((thing) => {
        return <li key={thing.id}>{thing.name}</li>;
      })}
    </ul>
  );
};

export default connect((state) => state)(Things);
