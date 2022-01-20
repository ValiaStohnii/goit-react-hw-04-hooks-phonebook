import React from 'react';

const Filter = ({ value, onChange }) => (
  <label>
    Filter <input type="text" value={value} onChange={onChange}></input>
  </label>
);

export default Filter;
