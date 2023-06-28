import React from 'react';

function FilterCheckbox() {
  return (
    <label className="toggle">
      <input className="toggle__checkbox" type="checkbox"/>
      <span className="toggle__switch"></span>
      <span className="toggle__label">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;
