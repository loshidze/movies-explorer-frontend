import React from 'react';

function FilterCheckbox({ isChecked, toggleCheckbox }) {
  return (
    <label className="toggle">
      <input className="toggle__checkbox" type="checkbox" checked={isChecked || ''} onChange={toggleCheckbox}/>
      <span className="toggle__switch"></span>
      <span className="toggle__label">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;
